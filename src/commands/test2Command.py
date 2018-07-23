import sublime_plugin

from ...pylib.JSWindowCommand import JSWindowCommand

class test2Command(JSWindowCommand, sublime_plugin.WindowCommand):

  def run(self, **args):
    super(test2Command, self).run(**args)