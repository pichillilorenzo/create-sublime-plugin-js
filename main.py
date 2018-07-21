import threading
import subprocess
import socketserver
import http
import requests
import traceback
import json, logging
from .jsonrpc import JSONRPCResponseManager, dispatcher
import inspect
import uuid
import sublime, sublime_plugin
import sys
import os
import codecs
import shutil
import tarfile
import zipfile
import urllib
from http.server import BaseHTTPRequestHandler, HTTPServer

PACKAGE_PATH = os.path.dirname(os.path.abspath(__file__))
PACKAGE_NAME = os.path.basename(PACKAGE_PATH)
SUBLIME_PACKAGES_PATH = os.path.dirname(PACKAGE_PATH)
NODE_VERSION = 'v10.7.0'
NODE_PATH = os.path.join( PACKAGE_PATH, 'node', 'node.exe' if sublime.platform() == "windows" else os.path.join('bin', 'node') )
NPM_PATH = os.path.join( PACKAGE_PATH, 'node', 'npm' if sublime.platform() == "windows" else os.path.join('bin', 'npm') )

def checkNamedThreadIsAlive(thread_name) :
  for thread in threading.enumerate() :
    if thread.getName() == thread_name and thread.is_alive() :
      return True
  return False

def createStartNamedThread(target, thread_name, args=[]) :
  if not checkNamedThreadIsAlive(thread_name) :
    thread = threading.Thread(target=target, name=thread_name, args=args)
    thread.setDaemon(True)
    thread.start()
    return thread
  return None

def downloadNodeJS():
  print('install nodejs and npm')
  nodeDirPath = os.path.join(PACKAGE_PATH, 'node')
  nodeModules = os.path.join(PACKAGE_PATH, 'node_modules')

  if os.path.exists(nodeDirPath):
    print('remove ' + nodeDirPath)
    if sublime.platform() == "windows":
      os.system('rmdir /S /Q \"{}\"'.format(nodeDirPath))
    else:
      shutil.rmtree(nodeDirPath)

  if os.path.exists(nodeModules):
    print('remove ' + nodeModules)
    if sublime.platform() == "windows":
      os.system('rmdir /S /Q \"{}\"'.format(nodeModules))
    else:
      shutil.rmtree(nodeModules)

  print('create' + nodeDirPath)
  os.mkdir(nodeDirPath)

  nodeUrl = 'https://nodejs.org/dist/' + NODE_VERSION + '/node-' + NODE_VERSION + '-'
  extension = '.tar.gz'

  if sublime.platform() == 'osx':
    nodeUrl += 'darwin-'
  elif sublime.platform() == 'windows':
    nodeUrl += 'win-'
    extension = '.zip'
  else:
    nodeUrl += sublime.platform() + '-'

  nodeUrl += sublime.arch() + extension
  nodeZippedFile = os.path.join(nodeDirPath, nodeUrl.split('/')[-1])

  print('download nodejs and npm')
  request = urllib.request.Request(nodeUrl)
  request.add_header('User-agent', r'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1')
  with urllib.request.urlopen(request) as response :
    with open(nodeZippedFile, 'wb') as file :
      shutil.copyfileobj(response, file)

  print('unzip nodejs and npm')
  if sublime.platform() == 'windows':
    # windows
    with zipfile.ZipFile(nodeZippedFile) as zf:
      for info in zf.infolist():
        bufsiz = 16 * 2048
        with zf.open(info) as fin, open(nodeDirPath, 'w') as fout:
          while True:
            buf = fin.read(bufsiz)
            if not buf:
              break
            fout.write(buf)
  else:
    with tarfile.open(nodeZippedFile, "r:gz") as tar :
      for member in tar.getmembers() :
        member.name = os.sep.join(member.name.split(os.sep)[1:])
        tar.extract(member, nodeDirPath)

  print('completed')

  print('remove ' + nodeZippedFile)
  os.remove(nodeZippedFile)

def installPackageJsonDependencies():
  owd = os.getcwd()
  os.chdir(PACKAGE_PATH)
  print('install package.json dependencies')
  output = subprocess.check_output([NODE_PATH, NPM_PATH, 'install'], stderr=subprocess.STDOUT)
  print(codecs.decode(output, "utf-8", "ignore").strip())
  os.chdir(owd)

NODE_SERVER_PATH = os.path.join(PACKAGE_PATH, 'index.js')

URL_NODE_SERVER = ""
HEADERS_NODE_SERVER = {'content-type': 'application/json'}

VARIABLE_MAPPING = {}

def evalCode(code, save=True, globals=None, locals=None):
  global VARIABLE_MAPPING

  result_var_name = ""
  result = None
  error = None
  value = None
  
  try:
    result = eval(code, globals, locals)
  except SyntaxError as e:
    try:
      exec(code, globals, locals)
    except Exception as err:
      traceback.print_exc()
      error = {
        "message": err.message if hasattr(err, "message") else str(err),
        "code": err.errno if hasattr(err, "errno") else None,
        "type": type(err).__name__
      }
  except Exception as err:
    print(code)
    traceback.print_exc()
    error = {
      "message": err.message if hasattr(err, "message") else str(err),
      "code": err.errno if hasattr(err, "errno") else None,
      "type": type(err).__name__
    }

  if save:
    result_var_name = str(uuid.uuid4())
    VARIABLE_MAPPING[result_var_name] = result

  if isinstance(result, list):
    for i in range(0, len(result)):
      r = result[i]
      if isinstance(r, sublime.View) or isinstance(r, sublime.Window):
        r_var_name = str(uuid.uuid4())
        VARIABLE_MAPPING[r_var_name] = r
        result[i] = {
            "var": "",
            "mapTo": r_var_name,
            "code": "",
            "value": r,
            "error": None
          }

  try:
    value = json.loads(json.dumps(result, cls=ObjectEncoder))
  except Exception as err:
    traceback.print_exc()
    
  return {
    "var": "",
    "mapTo": result_var_name,
    "code": code,
    "value": value,
    "error": error
  }

def tryCommand(callback):
  result = None
  error = None
  value = None

  try:
    result = callback()
  except Exception as err:
    traceback.print_exc()
    error = {
      "message": err.message if hasattr(err, "message") else str(err),
      "code": err.errno if hasattr(err, "errno") else None,
      "type": type(err).__name__
    }

  try:
    value = json.loads(json.dumps(result, cls=ObjectEncoder))
  except Exception as err:
    traceback.print_exc()

  return {
    "var": "",
    "mapTo": "",
    "code": "",
    "value": value,
    "error": error
  }

def freeMemory(vars_mapped):
  global VARIABLE_MAPPING
  for var_mapped in vars_mapped:
    if "mapTo" in var_mapped and var_mapped["mapTo"] and var_mapped["mapTo"] in VARIABLE_MAPPING:
      del VARIABLE_MAPPING[var_mapped["mapTo"]]
    elif "self" in var_mapped and var_mapped["self"]["mapTo"] and var_mapped["self"]["mapTo"] in VARIABLE_MAPPING:
      del VARIABLE_MAPPING[var_mapped["self"]["mapTo"]]

def callback(port, *args):

    variable_created = []

    args_var_map = None

    if len(args) > 0:
      args_var_name = str(uuid.uuid4())
      VARIABLE_MAPPING[args_var_name] = args

      args_var_map = {
          "var": "args",
          "mapTo": args_var_name,
          "code": "",
          "value": json.loads(json.dumps(args, cls=ObjectEncoder))
      }

    payload = {
        "method": "callback",
        "params": [args_var_map] if len(args) > 0 else [],
        "jsonrpc": "2.0",
        "id": 0,
    }

    response = requests.post("http://localhost:" + str(port) + "/jsonrpc", data=json.dumps(payload), headers=HEADERS_NODE_SERVER).json()

    while "result" in response and not "end_cb_step" in response["result"]:

        result = evalCode(response["result"]["eval"], response["result"]["save"])
        variable_created.append(result)

        payload = {
            "method": "step",
            "params": [result],
            "jsonrpc": "2.0",
            "id": 0,
        }

        response = requests.post("http://localhost:" + str(response["result"]["port"]) + "/jsonrpc", data=json.dumps(payload), headers=HEADERS_NODE_SERVER).json()
    
    if "error" in response:
        print(response)

class JSONRPCRequestHandler(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_POST(self): 

        global VARIABLE_MAPPING

        content_length = int(self.headers['Content-Length']) # Gets the size of data
        post_data = self.rfile.read(content_length) # Gets the data itself

        self._set_response()
    
        # sublime methods
        dispatcher["set_timeout"] = lambda port, delay: tryCommand(lambda: sublime.set_timeout(lambda: callback(port), delay))
        dispatcher["set_timeout_async"] = lambda port, delay: tryCommand(lambda: sublime.set_timeout_async(lambda: callback(port), delay))
        dispatcher["error_message"] = lambda string: tryCommand(lambda: sublime.error_message(string))
        dispatcher["message_dialog"] = lambda string: tryCommand(lambda: sublime.message_dialog(string))
        dispatcher["ok_cancel_dialog"] = lambda string, ok_title: tryCommand(lambda: sublime.ok_cancel_dialog(string, ok_title))
        dispatcher["yes_no_cancel_dialog"] = lambda string, yes_title, no_title: tryCommand(lambda: sublime.yes_no_cancel_dialog(string, yes_title, no_title))
        dispatcher["load_resource"] = lambda name: tryCommand(lambda: sublime.load_resource(name))
        dispatcher["load_binary_resource"] = lambda name: tryCommand(lambda: sublime.load_binary_resource(name).decode('utf-8'))
        dispatcher["find_resources"] = lambda pattern: tryCommand(lambda: sublime.find_resources(pattern))
        dispatcher["encode_value"] = lambda value, pretty: tryCommand(lambda: sublime.encode_value(value, pretty))
        dispatcher["decode_value"] = lambda string: tryCommand(lambda: sublime.decode_value(string))
        dispatcher["expand_variables"] = lambda value, variables: tryCommand(lambda: sublime.expand_variables(value, variables))
        dispatcher["load_settings"] = lambda basename: tryCommand(lambda: sublime.load_settings(basename))
        dispatcher["packages_path"] = lambda: tryCommand(lambda: sublime.packages_path())
        dispatcher["installed_packages_path"] = lambda: tryCommand(lambda: sublime.installed_packages_path())
        dispatcher["cache_path"] = lambda: tryCommand(lambda: sublime.cache_path())
        dispatcher["get_clipboard"] = lambda size_limit: tryCommand(lambda: sublime.get_clipboard(size_limit))
        dispatcher["set_clipboard"] = lambda string: tryCommand(lambda: sublime.set_clipboard(string))
        dispatcher["score_selector"] = lambda scope, selector: tryCommand(lambda: sublime.score_selector(scope, selector))
        dispatcher["run_command"] = lambda string, args: tryCommand(lambda: sublime.run_command(string, args))
        dispatcher["log_commands"] = lambda flag: tryCommand(lambda: sublime.log_commands(flag))
        dispatcher["log_input"] = lambda flag: tryCommand(lambda: sublime.log_input(flag))
        dispatcher["log_result_regex"] = lambda flag: tryCommand(lambda: sublime.log_result_regex(flag))
        dispatcher["version"] = lambda: tryCommand(lambda: sublime.version())
        dispatcher["platform"] = lambda: tryCommand(lambda: sublime.platform())
        dispatcher["arch"] = lambda: tryCommand(lambda: sublime.arch())

        # sublime utils
        dispatcher["freeMemory"] = freeMemory
        dispatcher["evalCode"] = lambda code, save: evalCode(code, save)

        response = JSONRPCResponseManager.handle(post_data, dispatcher)

        try:
            self.wfile.write(response.json.encode('utf-8'))
        except TypeError as e:
            # decode
            self.wfile.write(response.json.decode('utf-8'))

    def log_message(self, format, *args):
        return


class ThreadedHTTPServer(object):
    def __init__(self, handler):
        self.server = socketserver.TCPServer(('', 0), handler)
        self.nodeServer = None

        with open(os.path.join(PACKAGE_PATH, 'sublime_port.txt'), 'w+') as file:
            file.write(str(self.server.socket.getsockname()[1]))

        self.server_thread = threading.Thread(target=self.server.serve_forever)
        self.server_thread.daemon = True

    def start(self):
        self.server_thread.start()
        threading.Thread(target=self.startNodeServer, daemon=True).start()

    def stop(self):
        if self.nodeServer and not self.nodeServer.poll():
            self.nodeServer.terminate()
        self.nodeServer = None
        
        if self.server:
            self.server.shutdown()
            self.server.server_close()
        self.server = None

    def startNodeServer(self):
        global URL_NODE_SERVER

        self.nodeServer = subprocess.Popen([NODE_PATH, NODE_SERVER_PATH], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        nodePort = codecs.decode(self.nodeServer.stdout.readline(), "utf-8", "ignore").strip()
        if not nodePort.isdigit():
            print('ERROR: Wrong Node Server port')
            print(nodePort)
            for line in self.nodeServer.stdout:
                line = codecs.decode(line, "utf-8", "ignore").replace("\n", "")
                print(line)
            print('Shutting down the JSONRPC Server...')
            self.stop()
            return
        URL_NODE_SERVER = "http://localhost:" + nodePort + "/jsonrpc"

        while self.nodeServer:
            line = self.nodeServer.stdout.readline()
            line = "Node server: " + codecs.decode(line, "utf-8", "ignore").replace("\n", "")
            print(line)

class ObjectEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, "to_json"):
            return self.default(obj.to_json())
        elif hasattr(obj, "__dict__"):
            d = dict(
                (key, value)
                for key, value in inspect.getmembers(obj)
                if not key.startswith("__")
                and not inspect.isabstract(value)
                and not inspect.isbuiltin(value)
                and not inspect.isfunction(value)
                and not inspect.isgenerator(value)
                and not inspect.isgeneratorfunction(value)
                and not inspect.ismethod(value)
                and not inspect.ismethoddescriptor(value)
                and not inspect.isroutine(value)
            )
            return self.default(d)
        elif type(obj) is sublime.Region:
            return self.default(tuple(obj))
        return obj

class testCommand(sublime_plugin.TextCommand):
    def run(self, edit, **args):

        if not URL_NODE_SERVER:
            return

        global VARIABLE_MAPPING

        self_var_name = str(uuid.uuid4())
        VARIABLE_MAPPING[self_var_name] = self

        variable_created = []

        self_var_map = {
            "var": "self",
            "mapTo": self_var_name,
            "code": "",
            "value": json.loads(json.dumps(self, cls=ObjectEncoder))
        }

        edit_var_name = str(uuid.uuid4())
        VARIABLE_MAPPING[edit_var_name] = edit

        edit_var_map = {
            "var": "edit",
            "mapTo": edit_var_name,
            "code": "",
            "value": json.loads(json.dumps(edit, cls=ObjectEncoder))
        }

        args_var_name = str(uuid.uuid4())
        VARIABLE_MAPPING[args_var_name] = args

        args_var_map = {
            "var": "args",
            "mapTo": args_var_name,
            "code": "",
            "value": json.loads(json.dumps(args, cls=ObjectEncoder))
        }

        payload = {
            "method": "testCommand",
            "params": [self_var_map, edit_var_map, args_var_map],
            "jsonrpc": "2.0",
            "id": 0,
        }

        response = requests.post(URL_NODE_SERVER, data=json.dumps(payload), headers=HEADERS_NODE_SERVER).json()

        variable_created += [self_var_map, edit_var_map, args_var_map]

        while "result" in response and not "end_cb_step" in response["result"]:

            result = evalCode(response["result"]["eval"], response["result"]["save"], locals = {"variable_created": variable_created})
            variable_created.append(result)

            payload = {
                "method": "step",
                "params": [result],
                "jsonrpc": "2.0",
                "id": 0,
            }

            response = requests.post("http://localhost:" + str(response["result"]["port"]) + "/jsonrpc", data=json.dumps(payload), headers=HEADERS_NODE_SERVER).json()
        
        if "error" in response:
            print(response)

class test2Command(sublime_plugin.TextCommand):
  def run(self, edit, **args):
    print(args)
    print("ciao")

def start():
  global server

  if not os.path.exists(NODE_PATH):
    # download nodejs and npm
    try:
      downloadNodeJS()
    except Exception as e:
      sublime.error_message('Can\'t download nodejs and npm for the "' + PACKAGE_NAME + '" plugin!\nError:' + str(e))
      return

  if not os.path.exists(os.path.join(PACKAGE_PATH, 'node_modules')):
    # install package.json dependencies
    try:
      installPackageJsonDependencies()
    except Exception as e:
      sublime.error_message('Can\'t install package.json dependencies of the "' + PACKAGE_NAME + '" plugin!\nError:' + str(e))
      return

  # Start the threaded server
  server = ThreadedHTTPServer(JSONRPCRequestHandler)
  server.start()

def plugin_unloaded():
    global server
    if server:
      server.stop()

server = None

def plugin_loaded():
  sublime.set_timeout_async(start)
