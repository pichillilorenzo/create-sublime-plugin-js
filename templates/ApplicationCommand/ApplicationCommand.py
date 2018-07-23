import sublime_plugin

from ...pylib.JSApplicationCommand import JSApplicationCommand

class $commandNameCommand(JSApplicationCommand, sublime_plugin.ApplicationCommand):

  def run(self, edit, **args):
    super($commandNameCommand, self).run(edit, **args)