import sublime, sublime_plugin
import requests
import os
import traceback
import subprocess
import threading
import codecs
import shutil
import zipfile
import tarfile
import urllib
import json
import uuid

from . import global_vars
from .ObjectEncoder import ObjectEncoder

def isSublimePluginInstance (instance) :
  return isinstance(instance, sublime_plugin.EventListener) or \
              isinstance(instance, sublime_plugin.ViewEventListener) or \
              isinstance(instance, sublime_plugin.ApplicationCommand) or \
              isinstance(instance, sublime_plugin.WindowCommand) or \
              isinstance(instance, sublime_plugin.TextCommand) or \
              isinstance(instance, sublime_plugin.TextInputHandler) or \
              isinstance(instance, sublime_plugin.ListInputHandler)


def isSublimeInstance (instance) :
  return type(instance) in [sublime.Region,
                            sublime.View,
                            sublime.Window,
                            sublime.Selection,
                            sublime.Settings,
                            sublime.Sheet,
                            sublime.Phantom,
                            sublime.PhantomSet,
                            sublime.Edit]


def saveVariable (obj) :
  mapTo = str(uuid.uuid4())
  global_vars.VARIABLE_MAPPING[mapTo] = obj
  return mapTo


def createMappedVariable (obj=None, save=False, mapTo='', code='', value='', error=None) :
  if save and obj != None:
    mapTo = saveVariable(obj)
  return {
      "mapTo": mapTo,
      "code": code,
      "value": value,
      "error": None
    }


def stepResponse (payload, urlNodeServer = '', saveSublimeInstanceParams = False) :

  if not urlNodeServer:
    if global_vars.URL_NODE_SERVER:
      urlNodeServer = global_vars.URL_NODE_SERVER
    else:
      return None

  sublimePluginInstance = False

  if len(payload["params"]) > 0:
    possibleSublimePlugin = payload["params"][0]
    # if the first param is a sublime_plugin instance, then save it
    if isSublimePluginInstance(possibleSublimePlugin):
      sublimePluginInstance = True
      if not "mapTo" in possibleSublimePlugin.__dict__:
        possibleSublimePlugin.mapTo = str(uuid.uuid4())
        global_vars.VARIABLE_MAPPING[possibleSublimePlugin.mapTo] = possibleSublimePlugin
      payload["params"][0] = createMappedVariable(mapTo=possibleSublimePlugin.mapTo, value="SublimeObject")

    if saveSublimeInstanceParams:
      for i in range(0, len(payload["params"])):
        if isSublimeInstance(payload["params"][i]):
          payload["params"][i] = createMappedVariable(obj=payload["params"][i], save=True, value="SublimeObject")

  variable_created = json.loads(json.dumps(payload["params"], cls=ObjectEncoder)) if (isinstance(payload["params"], list)) else []
  variable_created = variable_created[1:] if sublimePluginInstance else variable_created
  
  try:
    response = requests.post(urlNodeServer, data=json.dumps(payload, cls=ObjectEncoder), headers=global_vars.HEADERS_NODE_SERVER).json()
  except Exception as e:
    print(e)
    return None
    
  while "result" in response and not "end_cb_step" in response["result"]:

    loc = locals()
    loc["variable_created"] = variable_created

    result = evalCode(response["result"]["eval"], response["result"]["save"], locals=loc)
    variable_created.append(result)

    payload = {
      "method": "step",
      "params": [result],
      "jsonrpc": "2.0",
      "id": 0,
    }

    try:
      response = requests.post("http://localhost:" + str(response["result"]["port"]) + "/jsonrpc", data=json.dumps(payload, cls=ObjectEncoder), headers=global_vars.HEADERS_NODE_SERVER).json()
    except Exception as e:
      print(e)
      return response
  
  if "error" in response:
    print(response)

  return response


def callback(port, *args):

  payload = {
    "method": "callback",
    "params": args if len(args) > 0 else [],
    "jsonrpc": "2.0",
    "id": 0,
  }

  stepResponse(payload, "http://localhost:" + str(port) + "/jsonrpc")


def freeMemory(vars_mapped):
  for var_mapped in vars_mapped:
    if "mapTo" in var_mapped and var_mapped["mapTo"] and var_mapped["mapTo"] in global_vars.VARIABLE_MAPPING:
      del global_vars.VARIABLE_MAPPING[var_mapped["mapTo"]]


def tryCommand(callback):
  result = None
  error = None
  resultEncoded = None

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
    resultEncoded = json.loads(json.dumps(result, cls=ObjectEncoder))
  except Exception as err:
    traceback.print_exc()

  if isinstance(resultEncoded, dict) and "mapTo" in resultEncoded:
    return createMappedVariable(obj=result, value=resultEncoded["value"], error=error)
  
  return createMappedVariable(value=resultEncoded, error=error)


def evalCode(code, save=True, globals=None, locals=None):

  result = None
  error = None
  resultEncoded = None

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

  try:
    resultEncoded = json.loads(json.dumps(result, cls=ObjectEncoder))
  except Exception as err:
    traceback.print_exc()

  if isinstance(resultEncoded, dict) and "mapTo" in resultEncoded:
    return createMappedVariable(obj=result, save=save, value=resultEncoded["value"], code=code, error=error)

  return createMappedVariable(code=code, value=resultEncoded, error=error)


def installPackageJsonDependencies():
  owd = os.getcwd()
  os.chdir(global_vars.PACKAGE_PATH)
  print(global_vars.PACKAGE_NAME + ': installing package.json dependencies')
  output = subprocess.check_output([global_vars.NODE_PATH, global_vars.NPM_PATH, 'install'], stderr=subprocess.STDOUT)
  print(codecs.decode(output, "utf-8", "ignore").strip())
  os.chdir(owd)


def downloadNodeJS():
  print(global_vars.PACKAGE_NAME + ': installing nodejs and npm')
  nodeDirPath = os.path.join(global_vars.PACKAGE_PATH, 'node')
  nodeModules = os.path.join(global_vars.PACKAGE_PATH, 'node_modules')

  if os.path.exists(nodeDirPath):
    print(global_vars.PACKAGE_NAME + ': removing ' + nodeDirPath)
    if sublime.platform() == "windows":
      os.system('rmdir /S /Q \"{}\"'.format(nodeDirPath))
    else:
      shutil.rmtree(nodeDirPath)

  if os.path.exists(nodeModules):
    print(global_vars.PACKAGE_NAME + ': removing ' + nodeModules)
    if sublime.platform() == "windows":
      os.system('rmdir /S /Q \"{}\"'.format(nodeModules))
    else:
      shutil.rmtree(nodeModules)

  print(global_vars.PACKAGE_NAME + ': creating ' + nodeDirPath)
  os.mkdir(nodeDirPath)

  nodeUrl = 'https://nodejs.org/dist/' + global_vars.NODE_VERSION + '/node-' + global_vars.NODE_VERSION + '-'
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

  print(global_vars.PACKAGE_NAME + ': downloading nodejs and npm')
  request = urllib.request.Request(nodeUrl)
  request.add_header('User-agent', r'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1')
  with urllib.request.urlopen(request) as response :
    with open(nodeZippedFile, 'wb') as file :
      shutil.copyfileobj(response, file)

  print(global_vars.PACKAGE_NAME + ': unzipping nodejs and npm')
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

  print(global_vars.PACKAGE_NAME + ': nodejs and npm installation completed')

  print(global_vars.PACKAGE_NAME + ': removing ' + nodeZippedFile)
  os.remove(nodeZippedFile)

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
