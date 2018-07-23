import sublime
import os

PACKAGE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PACKAGE_NAME = os.path.basename(PACKAGE_PATH)
SUBLIME_PACKAGES_PATH = os.path.dirname(PACKAGE_PATH)

NODE_VERSION = 'v10.7.0'
NODE_PATH = os.path.join( PACKAGE_PATH, 'node', 'node.exe' if sublime.platform() == "windows" else os.path.join('bin', 'node') )
NPM_PATH = os.path.join( PACKAGE_PATH, 'node', 'npm' if sublime.platform() == "windows" else os.path.join('bin', 'npm') )

NODE_SERVER_PATH = os.path.join(PACKAGE_PATH, 'server.js')
URL_NODE_SERVER = ""
HEADERS_NODE_SERVER = {'content-type': 'application/json'}

VARIABLE_MAPPING = {}