import sublime_plugin

from ....pylib.JSApplicationCommand import JSApplicationCommand

class $commandNameCommand(JSApplicationCommand, sublime_plugin.ApplicationCommand):

  def run(self, **args):
    super($commandNameCommand, self).run(**args)