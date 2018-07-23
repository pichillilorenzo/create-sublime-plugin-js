import sublime, sublime_plugin
import inspect
import uuid
import json

from . import global_vars

class ObjectEncoder(json.JSONEncoder):
  def default(self, obj):
    if type(obj) in [sublime.Region,
                     sublime.View,
                     sublime.Window,
                     sublime.Selection,
                     sublime.Settings,
                     sublime.Sheet,
                     sublime.Phantom,
                     sublime.PhantomSet,
                     sublime.Edit] or \
                     isinstance(obj, sublime_plugin.EventListener) or \
                     isinstance(obj, sublime_plugin.ViewEventListener) or \
                     isinstance(obj, sublime_plugin.ApplicationCommand) or \
                     isinstance(obj, sublime_plugin.WindowCommand) or \
                     isinstance(obj, sublime_plugin.TextCommand) or \
                     isinstance(obj, sublime_plugin.TextInputHandler) or \
                     isinstance(obj, sublime_plugin.ListInputHandler):
                     
      var_name = str(uuid.uuid4())
      global_vars.VARIABLE_MAPPING[var_name] = obj
      result = {
          "mapTo": var_name,
          "code": "",
          "value": "SublimeObject",
          "error": None
        }
      return self.default(result)

    elif hasattr(obj, "to_json"):
      return self.default(obj.to_json())

    elif hasattr(obj, "__dict__"):
      d = dict(
        (key, value)
        for key, value in inspect.getmembers(obj)
        if not key.startswith("__")
        and not inspect.isabstract(value)
        and not inspect.isbuiltin(value)
        and not inspect.isfunction(value)
        and not inspect.isgenerator(value)
        and not inspect.isgeneratorfunction(value)
        and not inspect.ismethod(value)
        and not inspect.ismethoddescriptor(value)
        and not inspect.isroutine(value)
      )
      return self.default(d)
    return obj