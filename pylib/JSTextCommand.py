from . import util

class JSTextCommand():

  def run(self, edit, **args):

    payload = {
      "method": "run_" + type(self).__name__,
      "params": [self, edit, args],
      "jsonrpc": "2.0",
      "id": 0,
    }
    
    util.stepResponse(payload, saveSublimeInstanceParams=True)

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

  def description(self, **args):

    payload = {
        "method": "description_" + type(self).__name__,
        "params": [self, args],
        "jsonrpc": "2.0",
        "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["description"] if response != None else None

  def want_event(self, **args):

    payload = {
        "method": "want_event_" + type(self).__name__,
        "params": [self, args],
        "jsonrpc": "2.0",
        "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["want_event"] if response != None else False