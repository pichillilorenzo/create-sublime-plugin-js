import sublime_plugin

from ...pylib.JSEventListener import JSEventListener

class $listenerNameListener(JSEventListener, sublime_plugin.EventListener):

  def on_new(self, view):
    super($listenerNameCommand, self).on_new(view)