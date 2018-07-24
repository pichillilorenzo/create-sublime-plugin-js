import sublime_plugin

from ....pylib.JSTextCommand import JSTextCommand

class $commandNameCommand(JSTextCommand, sublime_plugin.TextCommand):

  def run(self, edit, **args):
    super($commandNameCommand, self).run(edit, **args)