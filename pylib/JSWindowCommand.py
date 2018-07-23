from . import util

class JSWindowCommand():

  def run(self, **args):

    payload = {
      "method": type(self).__name__,
      "params": [self, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def is_enabled(self, **args):

    payload = {
      "method": "is_enabled_" + type(self).__name__,
      "params": [self, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["is_enabled"] if response != None else True

  def is_visible(self, **args):
    
    payload = {
      "method": "is_visible_" + type(self).__name__,
      "params": [self, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["is_visible"] if response != None else True
