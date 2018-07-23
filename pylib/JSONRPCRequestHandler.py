import sublime
from http.server import BaseHTTPRequestHandler

from .jsonrpc import JSONRPCResponseManager, dispatcher
from . import util

class JSONRPCRequestHandler(BaseHTTPRequestHandler):
  def _set_response(self):
    self.send_response(200)
    self.send_header('Content-type', 'application/json')
    self.end_headers()

  def do_POST(self):

    content_length = int(self.headers['Content-Length']) # Gets the size of data
    post_data = self.rfile.read(content_length) # Gets the data itself

    self._set_response()

    # sublime methods
    dispatcher["set_timeout"] = lambda port, delay: util.tryCommand(lambda: sublime.set_timeout(lambda: util.callback(port), delay))
    dispatcher["set_timeout_async"] = lambda port, delay: util.tryCommand(lambda: sublime.set_timeout_async(lambda: util.callback(port), delay))
    dispatcher["error_message"] = lambda string: util.tryCommand(lambda: sublime.error_message(string))
    dispatcher["message_dialog"] = lambda string: util.tryCommand(lambda: sublime.message_dialog(string))
    dispatcher["ok_cancel_dialog"] = lambda string, ok_title: util.tryCommand(lambda: sublime.ok_cancel_dialog(string, ok_title))
    dispatcher["yes_no_cancel_dialog"] = lambda string, yes_title, no_title: util.tryCommand(lambda: sublime.yes_no_cancel_dialog(string, yes_title, no_title))
    dispatcher["load_resource"] = lambda name: util.tryCommand(lambda: sublime.load_resource(name))
    dispatcher["load_binary_resource"] = lambda name: util.tryCommand(lambda: sublime.load_binary_resource(name).decode('utf-8'))
    dispatcher["find_resources"] = lambda pattern: util.tryCommand(lambda: sublime.find_resources(pattern))
    dispatcher["encode_value"] = lambda value, pretty: util.tryCommand(lambda: sublime.encode_value(value, pretty))
    dispatcher["decode_value"] = lambda string: util.tryCommand(lambda: sublime.decode_value(string))
    dispatcher["expand_variables"] = lambda value, variables: util.tryCommand(lambda: sublime.expand_variables(value, variables))
    dispatcher["load_settings"] = lambda basename: util.tryCommand(lambda: sublime.load_settings(basename))
    dispatcher["packages_path"] = lambda: util.tryCommand(lambda: sublime.packages_path())
    dispatcher["installed_packages_path"] = lambda: util.tryCommand(lambda: sublime.installed_packages_path())
    dispatcher["cache_path"] = lambda: util.tryCommand(lambda: sublime.cache_path())
    dispatcher["get_clipboard"] = lambda size_limit: util.tryCommand(lambda: sublime.get_clipboard(size_limit))
    dispatcher["set_clipboard"] = lambda string: util.tryCommand(lambda: sublime.set_clipboard(string))
    dispatcher["score_selector"] = lambda scope, selector: util.tryCommand(lambda: sublime.score_selector(scope, selector))
    dispatcher["run_command"] = lambda string, args: util.tryCommand(lambda: sublime.run_command(string, args))
    dispatcher["get_macro"] = lambda: util.tryCommand(lambda: sublime.get_macro())
    dispatcher["log_commands"] = lambda flag: util.tryCommand(lambda: sublime.log_commands(flag))
    dispatcher["log_input"] = lambda flag: util.tryCommand(lambda: sublime.log_input(flag))
    dispatcher["log_result_regex"] = lambda flag: util.tryCommand(lambda: sublime.log_result_regex(flag))
    dispatcher["version"] = lambda: util.tryCommand(lambda: sublime.version())
    dispatcher["platform"] = lambda: util.tryCommand(lambda: sublime.platform())
    dispatcher["arch"] = lambda: util.tryCommand(lambda: sublime.arch())

    # sublime utils
    dispatcher["freeMemory"] = util.freeMemory
    dispatcher["evalCode"] = lambda code, save: util.evalCode(code, save)

    response = JSONRPCResponseManager.handle(post_data, dispatcher)

    try:
      self.wfile.write(response.json.encode('utf-8'))
    except TypeError as e:
      # decode
      self.wfile.write(response.json.decode('utf-8'))

  def log_message(self, format, *args):
    return