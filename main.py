import sublime, sublime_plugin
import shutil
import os
import subprocess
import codecs
import traceback

from .pylib import global_vars
from .pylib import util
from .pylib.JSONRPCRequestHandler import JSONRPCRequestHandler
from .pylib.ThreadedHTTPServer import ThreadedHTTPServer

from .pysrc.commands import *
from .pysrc.listeners import *

server = None

def start():
  global server

  if sublime.platform() == "windows":
    output = subprocess.check_output("wmic process where \"name='node.exe'\" get ProcessID,ExecutablePath", shell=True, stderr=subprocess.STDOUT)
    output = codecs.decode(output, "utf-8", "ignore").strip()
    for line in output.splitlines():
      line = line.strip()
      if line.startswith(global_vars.PACKAGE_PATH):
        pid = line.split(' ')[-1]
        subprocess.check_call("TASKKILL /PID {} /F".format(pid), shell=True, stderr=subprocess.STDOUT)

  if os.path.exists(global_vars.NODE_PATH):
    for file in os.listdir(os.path.join( global_vars.PACKAGE_PATH, 'node')):
      if file.endswith('.zip'):
        if sublime.platform() == "windows":
          subprocess.check_call('del /f /s /q \"{0}\" && rmdir /S /Q \"{0}\"'.format( "\\\\?\\" + os.path.join( global_vars.PACKAGE_PATH, 'node' ) ), shell=True, stderr=subprocess.STDOUT)
        else:
          shutil.rmtree(os.path.join( global_vars.PACKAGE_PATH, 'node' ))
        break

    output = ''
    try:
      if sublime.platform() == "windows":
        output = subprocess.check_output([global_vars.NODE_PATH, '-v'], shell=True, stderr=subprocess.STDOUT)
      else:
        output = subprocess.check_output([global_vars.NODE_PATH, '-v'], stderr=subprocess.STDOUT)
      output = codecs.decode(output, "utf-8", "ignore").strip()
    except Exception as e:
      traceback.print_exc()
      sublime.error_message('Nodejs and npm is not working for the "' + global_vars.PACKAGE_NAME + '" plugin!\nError:' + str(e))

    if global_vars.NODE_VERSION != output:
      print('Node version incorrect: ' + output)
      print('Removing current node version')
      if sublime.platform() == "windows":
        subprocess.check_call('del /f /s /q \"{0}\" && rmdir /S /Q \"{0}\"'.format( "\\\\?\\" + os.path.join( global_vars.PACKAGE_PATH, 'node' ) ), shell=True, stderr=subprocess.STDOUT)
      else:
        shutil.rmtree(os.path.join( global_vars.PACKAGE_PATH, 'node' ))

  if not os.path.exists(global_vars.NODE_PATH):
    # download nodejs and npm
    try:
      sublime.active_window().status_message('Downloading nodejs and npm for the "' + global_vars.PACKAGE_NAME + '" plugin!')
      util.downloadNodeJS()
    except Exception as e:
      traceback.print_exc()
      sublime.error_message('Can\'t download nodejs and npm for the "' + global_vars.PACKAGE_NAME + '" plugin!\nError:' + str(e))
      return

    sublime.active_window().status_message('Download of nodejs and npm for the "' + global_vars.PACKAGE_NAME + '" plugin completed!')

  if os.path.exists(os.path.join(global_vars.PACKAGE_PATH, 'node_modules')) and not os.path.exists(os.path.join(global_vars.PACKAGE_PATH, 'node_modules', '.bin', 'create-sublime-plugin-js' )):
    if sublime.platform() == "windows":
      subprocess.check_call('del /f /s /q \"{0}\" && rmdir /S /Q \"{0}\"'.format( "\\\\?\\" + os.path.join( global_vars.PACKAGE_PATH, 'node_modules' ) ), shell=True, stderr=subprocess.STDOUT)
    else:
      shutil.rmtree( os.path.join( global_vars.PACKAGE_PATH, 'node_modules' ) )

  if not os.path.exists(os.path.join(global_vars.PACKAGE_PATH, 'node_modules')):
    # install package.json dependencies
    try:
      sublime.active_window().status_message('Installing package.json dependencies for the "' + global_vars.PACKAGE_NAME + '" plugin!')
      util.installPackageJsonDependencies()
    except Exception as e:
      traceback.print_exc()
      sublime.error_message('Can\'t install package.json dependencies of the "' + global_vars.PACKAGE_NAME + '" plugin!\nError:' + str(e))
      return

    sublime.active_window().status_message('Installation of package.json dependencies for the "' + global_vars.PACKAGE_NAME + '" plugin completed!')

  # Start the threaded server
  server = ThreadedHTTPServer(JSONRPCRequestHandler)
  server.start()

def plugin_unloaded():

  payload = {
    "method": "plugin_unloaded",
    "params": [],
    "jsonrpc": "2.0",
    "id": 0,
  }
  util.stepResponse(payload)

  global server
  if server:
    server.stop()

def plugin_loaded():
  sublime.set_timeout_async(start)
