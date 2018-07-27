import sublime_plugin

from ...pylib.JSTextCommand import JSTextCommand

class {{commandName}}Command(JSTextCommand, sublime_plugin.TextCommand):

  {{#run}}
  def run(self, edit, **args):
    return super({{commandName}}Command, self).run(edit, **args)
  {{/run}}
  {{^run}}
  def run(self, edit, **args):
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

  {{#want_event}}
  def want_event(self, **args):
    return super({{commandName}}Command, self).want_event(**args)
  {{/want_event}}
  {{^want_event}}
  def want_event(self, **args):
    return False
  {{/want_event}}