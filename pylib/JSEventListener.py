from . import util

class JSEventListener():

  def on_new(self, view):

    payload = {
      "method": "on_new_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_new_async(self, view):

    payload = {
      "method": "on_new_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_clone(self, view):

    payload = {
      "method": "on_clone_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_clone_async(self, view):

    payload = {
      "method": "on_clone_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_load(self, view):

    payload = {
      "method": "on_load_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_load_async(self, view):

    payload = {
      "method": "on_load_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_pre_close(self, view):

    payload = {
      "method": "on_pre_close_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_close(self, view):

    payload = {
      "method": "on_close_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_pre_save(self, view):

    payload = {
      "method": "on_pre_save_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_pre_save_async(self, view):

    payload = {
      "method": "on_pre_save_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_post_save(self, view):

    payload = {
      "method": "on_post_save_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_post_save_async(self, view):

    payload = {
      "method": "on_post_save_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_modified(self, view):

    payload = {
      "method": "on_modified_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_modified_async(self, view):

    payload = {
      "method": "on_modified_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_selection_modified(self, view):

    payload = {
      "method": "on_selection_modified_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_selection_modified_async(self, view):

    payload = {
      "method": "on_selection_modified_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_activated(self, view):

    payload = {
      "method": "on_activated_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_activated_async(self, view):

    payload = {
      "method": "on_activated_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_deactivated(self, view):

    payload = {
      "method": "on_deactivated_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_deactivated_async(self, view):

    payload = {
      "method": "on_deactivated_async_" + type(self).__name__,
      "params": [self, view],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_hover(self, view, point, hover_zone):

    payload = {
      "method": "on_hover_" + type(self).__name__,
      "params": [self, view, point, hover_zone],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_query_context(self, view, key, operator, operand, match_all):

    payload = {
      "method": "on_query_context_" + type(self).__name__,
      "params": [self, view, key, operator, operand, match_all],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload, saveSublimeInstanceParams=True)

    return response["result"]["on_query_context"] if response != None else None

  def on_query_completions(self, view, prefix, locations):

    payload = {
      "method": "on_query_completions_" + type(self).__name__,
      "params": [self, view, prefix, locations],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload, saveSublimeInstanceParams=True)

    if response != None:
      if response["result"]["on_query_completions"] and len(response["result"]["on_query_completions"]) == 2 and isinstance(response["result"]["on_query_completions"][1], int):
        response["result"]["on_query_completions"] = tuple(response["result"]["on_query_completions"])
      return response["result"]["on_query_completions"]

    return None

  def on_text_command(self, view, command_name, args):

    payload = {
      "method": "on_text_command_" + type(self).__name__,
      "params": [self, view, command_name, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload, saveSublimeInstanceParams=True)

    return response["result"]["on_text_command"] if response != None else True

  def on_window_command(self, view, command_name, args):

    payload = {
      "method": "on_window_command_" + type(self).__name__,
      "params": [self, view, command_name, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload, saveSublimeInstanceParams=True)

    return response["result"]["on_window_command"] if response != None else True

  def on_post_text_command(self, view, command_name, args):

    payload = {
      "method": "on_post_text_command_" + type(self).__name__,
      "params": [self, view, command_name, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)

  def on_post_window_command(self, view, command_name, args):

    payload = {
      "method": "on_post_window_command_" + type(self).__name__,
      "params": [self, view, command_name, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload, saveSublimeInstanceParams=True)