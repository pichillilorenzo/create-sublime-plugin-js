import sublime_plugin

from ...pylib.JSEventListener import JSEventListener

class {{listenerName}}Listener(JSEventListener, sublime_plugin.EventListener):

  {{#on_new}}
  def on_new(self, view):
    super({{listenerName}}Listener, self).on_new(view)
  {{/on_new}}
  {{^on_new}}
  def on_new(self, view):
    pass
  {{/on_new}}

  {{#on_new_async}}
  def on_new_async(self, view):
    super({{listenerName}}Listener, self).on_new_async(view)
  {{/on_new_async}}
  {{^on_new_async}}
  def on_new_async(self, view):
    pass
  {{/on_new_async}}

  {{#on_clone}}
  def on_clone(self, view):
    super({{listenerName}}Listener, self).on_clone(view)
  {{/on_clone}}
  {{^on_clone}}
  def on_clone(self, view):
    pass
  {{/on_clone}}

  {{#on_clone_async}}
  def on_clone_async(self, view):
    super({{listenerName}}Listener, self).on_clone_async(view)
  {{/on_clone_async}}
  {{^on_clone_async}}
  def on_clone_async(self, view):
    pass
  {{/on_clone_async}}
