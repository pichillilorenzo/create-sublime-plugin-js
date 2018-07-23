import sublime, sublime_plugin
import shutil
import os
import subprocess
import codecs

from .pylib import global_vars
from .pylib import util
from .pylib.JSTextCommand import JSTextCommand
from .pylib.JSWindowCommand import JSWindowCommand
from .pylib.ThreadedHTTPServer import ThreadedHTTPServer
from .pylib.JSONRPCRequestHandler import JSONRPCRequestHandler

from .src.commands import *
from .src.listeners import *

server = None

def start():
  global server

  if os.path.exists(global_vars.NODE_PATH):
    output = ''
    try:
      output = subprocess.check_output([global_vars.NODE_PATH, '-v'], stderr=subprocess.STDOUT)
      output = codecs.decode(output, "utf-8", "ignore").strip()
    except Exception as e:
      sublime.error_message('Nodejs and npm is not working for the "' + global_vars.PACKAGE_NAME + '" plugin!\nError:' + str(e))

    if global_vars.NODE_VERSION != output:
      print('Node version incorrect: ' + output)
      print('Removing current node version')
      if sublime.platform() == "windows":
        os.system('rmdir /S /Q \"{}\"'.format(os.path.join( global_vars.PACKAGE_PATH, 'node' )))
      else:
        shutil.rmtree(os.path.join( global_vars.PACKAGE_PATH, 'node' ))

  if not os.path.exists(global_vars.NODE_PATH):
    # download nodejs and npm
    try:
      util.downloadNodeJS()
    except Exception as e:
      sublime.error_message('Can\'t download nodejs and npm for the "' + global_vars.PACKAGE_NAME + '" plugin!\nError:' + str(e))
      return

  if not os.path.exists(os.path.join(global_vars.PACKAGE_PATH, 'node_modules')):
    # install package.json dependencies
    try:
      util.installPackageJsonDependencies()
    except Exception as e:
      sublime.error_message('Can\'t install package.json dependencies of the "' + global_vars.PACKAGE_NAME + '" plugin!\nError:' + str(e))
      return

  # Start the threaded server
  server = ThreadedHTTPServer(JSONRPCRequestHandler)
  server.start()

def plugin_unloaded():
  global server
  if server:
    server.stop()

def plugin_loaded():
  sublime.set_timeout_async(start)
