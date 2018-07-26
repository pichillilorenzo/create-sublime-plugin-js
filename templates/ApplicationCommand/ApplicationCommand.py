import sublime_plugin

from ...pylib.JSApplicationCommand import JSApplicationCommand

class {{commandName}}Command(JSApplicationCommand, sublime_plugin.ApplicationCommand):

  {{#run}}
  def run(self, **args):
    super({{commandName}}Command, self).run(**args)
  {{/run}}
  {{^run}}
  def run(self, **args):
    pass
  {{/run}}

  {{#is_enabled}}
  def is_enabled(self, **args):
    super({{commandName}}Command, self).is_enabled(**args)
  {{/is_enabled}}
  {{^is_enabled}}
  def is_enabled(self, **args):
    return True
  {{/is_enabled}}

  {{#is_visible}}
  def is_visible(self, **args):
    super({{commandName}}Command, self).is_visible(**args)
  {{/is_visible}}
  {{^is_visible}}
  def is_visible(self, **args):
    return True
  {{/is_visible}}

  {{#is_checked}}
  def is_checked(self, **args):
    super({{commandName}}Command, self).is_checked(**args)
  {{/is_checked}}
  {{^is_checked}}
  def is_checked(self, **args):
    return True
  {{/is_checked}}
  
  {{#description}}
  def description(self, **args):
    super({{commandName}}Command, self).description(**args)
  {{/description}}
  {{^description}}
  def description(self, **args):
    return None
  {{/description}}