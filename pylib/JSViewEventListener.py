from . import util

class JSViewEventListener():

  @classmethod
  def is_applicable(self, settings):

    payload = {
      "method": "is_applicable_" + type(self).__name__,
      "params": [self, settings],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["is_applicable"] if response != None else False

  @classmethod
  def applies_to_primary_view_only(self):

    payload = {
      "method": "applies_to_primary_view_only_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["applies_to_primary_view_only"] if response != None else False

  def on_load(self):

    payload = {
      "method": "on_load_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_load(self):

    payload = {
      "method": "on_load_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_load_async(self):

    payload = {
      "method": "on_load_async_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_pre_close(self):

    payload = {
      "method": "on_pre_close_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_close(self):

    payload = {
      "method": "on_close_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_pre_save(self):

    payload = {
      "method": "on_pre_save_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_pre_save_async(self):

    payload = {
      "method": "on_pre_save_async_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_post_save(self):

    payload = {
      "method": "on_post_save_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_post_save_async(self):

    payload = {
      "method": "on_post_save_async_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_modified(self):

    payload = {
      "method": "on_modified_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_modified_async(self):

    payload = {
      "method": "on_modified_async_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_selection_modified(self):

    payload = {
      "method": "on_selection_modified_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_selection_modified_async(self):

    payload = {
      "method": "on_selection_modified_async_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_activated(self):

    payload = {
      "method": "on_activated_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_activated_async(self):

    payload = {
      "method": "on_activated_async_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_deactivated(self):

    payload = {
      "method": "on_deactivated_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_deactivated_async(self):

    payload = {
      "method": "on_deactivated_async_" + type(self).__name__,
      "params": [self],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_hover(self, point, hover_zone):

    payload = {
      "method": "on_hover_" + type(self).__name__,
      "params": [self, point, hover_zone],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)

  def on_query_context(self, key, operator, operand, match_all):

    payload = {
      "method": "on_query_context_" + type(self).__name__,
      "params": [self, key, operator, operand, match_all],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["on_query_context"] if response != None else None

  def on_query_completions(self, prefix, locations):

    payload = {
      "method": "on_query_completions_" + type(self).__name__,
      "params": [self, prefix, locations],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload)

    if response != None:
      if response["result"]["on_query_completions"] and len(response["result"]["on_query_completions"]) == 2 and isinstance(response["result"]["on_query_completions"][1], int):
        response["result"]["on_query_completions"] = tuple(response["result"]["on_query_completions"])
      return response["result"]["on_query_completions"]

    return None

  def on_text_command(self, command_name, args):

    payload = {
      "method": "on_text_command_" + type(self).__name__,
      "params": [self, command_name, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    response = util.stepResponse(payload)

    return response["result"]["on_text_command"] if response != None else True

  def on_post_text_command(self, command_name, args):

    payload = {
      "method": "on_post_text_command_" + type(self).__name__,
      "params": [self, command_name, args],
      "jsonrpc": "2.0",
      "id": 0,
    }

    util.stepResponse(payload)
