import sublime_plugin

from ...pylib.JSWindowCommand import JSWindowCommand

class $commandNameCommand(JSWindowCommand, sublime_plugin.WindowCommand):

  def run(self, **args):
    super($commandNameCommand, self).run(**args)