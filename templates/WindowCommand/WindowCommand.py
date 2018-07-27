import sublime_plugin

from ...pylib.JSWindowCommand import JSWindowCommand

class {{commandName}}Command(JSWindowCommand, sublime_plugin.WindowCommand):

  {{#run}}
  def run(self, **args):
    return super({{commandName}}Command, self).run(**args)
  {{/run}}
  {{^run}}
  def run(self, **args):
    pass
  {{/run}}

  {{#is_enabled}}
  def is_enabled(self, **args):
    return super({{commandName}}Command, self).is_enabled(**args)
  {{/is_enabled}}
  {{^is_enabled}}
  def is_enabled(self, **args):
    return True
  {{/is_enabled}}

  {{#is_visible}}
  def is_visible(self, **args):
    return super({{commandName}}Command, self).is_visible(**args)
  {{/is_visible}}
  {{^is_visible}}
  def is_visible(self, **args):
    return True
  {{/is_visible}}

  {{#description}}
  def description(self, **args):
    return super({{commandName}}Command, self).description(**args)
  {{/description}}
  {{^description}}
  def description(self, **args):
    return None
  {{/description}}