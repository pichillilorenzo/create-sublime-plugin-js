import sublime, sublime_plugin
import inspect
import json

def isSublimePluginInstance (instance):
  return isinstance(instance, sublime_plugin.EventListener) or \
              isinstance(instance, sublime_plugin.ViewEventListener) or \
              isinstance(instance, sublime_plugin.ApplicationCommand) or \
              isinstance(instance, sublime_plugin.WindowCommand) or \
              isinstance(instance, sublime_plugin.TextCommand) or \
              isinstance(instance, sublime_plugin.TextInputHandler) or \
              isinstance(instance, sublime_plugin.ListInputHandler)

def isSublimeInstance (instance):
  return type(instance) in [sublime.Region,
                            sublime.View,
                            sublime.Window,
                            sublime.Selection,
                            sublime.Settings,
                            sublime.Sheet,
                            sublime.Phantom,
                            sublime.PhantomSet,
                            sublime.Edit]

class ObjectEncoder(json.JSONEncoder):
  def default(self, obj):
    if isSublimeInstance(obj) or isSublimePluginInstance(obj):
      result = {
          "mapTo": '',
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