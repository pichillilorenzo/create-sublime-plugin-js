import sublime
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

from . import global_vars
from .ObjectEncoder import ObjectEncoder

def stepResponse (payload, urlNodeServer = '') :

  if not urlNodeServer:
    if global_vars.URL_NODE_SERVER:
      urlNodeServer = global_vars.URL_NODE_SERVER
    else:
      return None
      
  response = requests.post(urlNodeServer, data=json.dumps(payload, cls=ObjectEncoder), headers=global_vars.HEADERS_NODE_SERVER).json()

  while "result" in response and not "end_cb_step" in response["result"]:

    result = evalCode(response["result"]["eval"], response["result"]["save"])

    payload = {
      "method": "step",
      "params": [result],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = requests.post("http://localhost:" + str(response["result"]["port"]) + "/jsonrpc", data=json.dumps(payload, cls=ObjectEncoder), headers=global_vars.HEADERS_NODE_SERVER).json()
  
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
    elif "self" in var_mapped and var_mapped["self"]["mapTo"] and var_mapped["self"]["mapTo"] in global_vars.VARIABLE_MAPPING:
      del global_vars.VARIABLE_MAPPING[var_mapped["self"]["mapTo"]]


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

  if isinstance(value, dict) and "mapTo" in value:
    if value["mapTo"] in global_vars.VARIABLE_MAPPING:
      del global_vars.VARIABLE_MAPPING[value["mapTo"]]
    value["value"] = None
    value["error"] = error
    return value
  
  return {
    "mapTo": "",
    "code": "",
    "value": value,
    "error": error
  }


def evalCode(code, save=True, globals=None, locals=None):

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

  try:
    value = json.loads(json.dumps(result, cls=ObjectEncoder))
  except Exception as err:
    traceback.print_exc()

  if isinstance(value, dict) and "mapTo" in value:
    if not save and value["mapTo"] and value["mapTo"] in global_vars.VARIABLE_MAPPING:
      del global_vars.VARIABLE_MAPPING[value["mapTo"]]
      value["mapTo"] = ''
    value["code"] = code
    value["error"] = error
    return value

  return {
    "mapTo": "",
    "code": code,
    "value": value,
    "error": error
  }


def installPackageJsonDependencies():
  owd = os.getcwd()
  os.chdir(global_vars.PACKAGE_PATH)
  print('install package.json dependencies')
  output = subprocess.check_output([global_vars.NODE_PATH, global_vars.NPM_PATH, 'install'], stderr=subprocess.STDOUT)
  print(codecs.decode(output, "utf-8", "ignore").strip())
  os.chdir(owd)


def downloadNodeJS():
  print('install nodejs and npm')
  nodeDirPath = os.path.join(global_vars.PACKAGE_PATH, 'node')
  nodeModules = os.path.join(global_vars.PACKAGE_PATH, 'node_modules')

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
