import sublime_plugin

from . import util

class JSEventListener(sublime_plugin.EventListener):

  def on_new(self, view):

    payload = {
      "method": "on_new_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_new_async(self, view):

    payload = {
      "method": "on_new_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_clone(self, view):

    payload = {
      "method": "on_clone_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_clone_async(self, view):

    payload = {
      "method": "on_clone_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

