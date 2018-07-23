import sublime_plugin

from ...pylib.JSTextCommand import JSTextCommand

class testCommand(JSTextCommand, sublime_plugin.TextCommand):

  def run(self, edit, **args):
    super(testCommand, self).run(edit, **args)