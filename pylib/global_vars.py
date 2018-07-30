import sublime
import os
import json

PACKAGE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PACKAGE_NAME = os.path.basename(PACKAGE_PATH)
SUBLIME_PACKAGES_PATH = os.path.dirname(PACKAGE_PATH)

NODE_VERSION = ''

with open(os.path.join(PACKAGE_PATH, 'package.json'), 'r') as packageJson:
  pkg = json.loads(packageJson.read())
  try:
    NODE_VERSION = "v" + pkg["create-sublime-plugin-js"]["node"]
  except Exception as e:
    print(e)
  
if NODE_VERSION == '':
  raise Exception("No node version specified in the " + os.path.join(PACKAGE_PATH, 'package.json') + " file!")

NODE_PATH = os.path.join( PACKAGE_PATH, 'node', os.path.join('node-' + NODE_VERSION + '-win-' + sublime.arch(), 'node.exe') if sublime.platform() == "windows" else os.path.join('bin', 'node') )
NPM_PATH = os.path.join( PACKAGE_PATH, 'node', os.path.join('node-' + NODE_VERSION + '-win-' + sublime.arch(), 'npm.cmd') if sublime.platform() == "windows" else os.path.join('bin', 'npm') )

NODE_SERVER_PATH = os.path.join(PACKAGE_PATH, 'server.js')
URL_NODE_SERVER = ""
HEADERS_NODE_SERVER = {'content-type': 'application/json'}

VARIABLE_MAPPING = {}