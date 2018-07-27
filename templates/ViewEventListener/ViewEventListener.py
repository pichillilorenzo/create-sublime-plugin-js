import sublime_plugin

from ...pylib.JSViewEventListener import JSViewEventListener

class {{listenerName}}Listener(JSViewEventListener, sublime_plugin.ViewEventListener):

  {{#is_applicable}}
  @classmethod
  def is_applicable(self, settings):
    return super({{listenerName}}Listener, self).is_applicable(settings)
  {{/is_applicable}}
  {{^is_applicable}}
  @classmethod
  def is_applicable(self, settings):
    pass
  {{/is_applicable}}

  {{#applies_to_primary_view_only}}
  @classmethod
  def applies_to_primary_view_only(self):
    return super({{listenerName}}Listener, self).applies_to_primary_view_only()
  {{/applies_to_primary_view_only}}
  {{^applies_to_primary_view_only}}
  @classmethod
  def applies_to_primary_view_only(self):
    pass
  {{/applies_to_primary_view_only}}

  {{#on_activated}}
  def on_activated(self):
    return super({{listenerName}}Listener, self).on_activated()
  {{/on_activated}}
  {{^on_activated}}
  def on_activated(self):
    pass
  {{/on_activated}}

  {{#on_activated_async}}
  def on_activated_async(self):
    return super({{listenerName}}Listener, self).on_activated_async()
  {{/on_activated_async}}
  {{^on_activated_async}}
  def on_activated_async(self):
    pass
  {{/on_activated_async}}

  {{#on_close}}
  def on_close(self):
    return super({{listenerName}}Listener, self).on_close()
  {{/on_close}}
  {{^on_close}}
  def on_close(self):
    pass
  {{/on_close}}

  {{#on_deactivated}}
  def on_deactivated(self):
    return super({{listenerName}}Listener, self).on_deactivated()
  {{/on_deactivated}}
  {{^on_deactivated}}
  def on_deactivated(self):
    pass
  {{/on_deactivated}}

  {{#on_deactivated_async}}
  def on_deactivated_async(self):
    return super({{listenerName}}Listener, self).on_deactivated_async()
  {{/on_deactivated_async}}
  {{^on_deactivated_async}}
  def on_deactivated_async(self):
    pass
  {{/on_deactivated_async}}

  {{#on_hover}}
  def on_hover(self, point, hover_zone):
    return super({{listenerName}}Listener, self).on_hover(point, hover_zone)
  {{/on_hover}}
  {{^on_hover}}
  def on_hover(self, point, hover_zone):
    pass
  {{/on_hover}}

  {{#on_load}}
  def on_load(self):
    return super({{listenerName}}Listener, self).on_load()
  {{/on_load}}
  {{^on_load}}
  def on_load(self):
    pass
  {{/on_load}}

  {{#on_load_async}}
  def on_load_async(self):
    return super({{listenerName}}Listener, self).on_load_async()
  {{/on_load_async}}
  {{^on_load_async}}
  def on_load_async(self):
    pass
  {{/on_load_async}}

  {{#on_modified}}
  def on_modified(self):
    return super({{listenerName}}Listener, self).on_modified()
  {{/on_modified}}
  {{^on_modified}}
  def on_modified(self):
    pass
  {{/on_modified}}

  {{#on_modified_async}}
  def on_modified_async(self):
    return super({{listenerName}}Listener, self).on_modified_async()
  {{/on_modified_async}}
  {{^on_modified_async}}
  def on_modified_async(self):
    pass
  {{/on_modified_async}}

  {{#on_post_save}}
  def on_post_save(self):
    return super({{listenerName}}Listener, self).on_post_save()
  {{/on_post_save}}
  {{^on_post_save}}
  def on_post_save(self):
    pass
  {{/on_post_save}}

  {{#on_post_save_async}}
  def on_post_save_async(self):
    return super({{listenerName}}Listener, self).on_post_save_async()
  {{/on_post_save_async}}
  {{^on_post_save_async}}
  def on_post_save_async(self):
    pass
  {{/on_post_save_async}}

  {{#on_post_text_command}}
  def on_post_text_command(self, command_name, args):
    return super({{listenerName}}Listener, self).on_post_text_command(command_name, args)
  {{/on_post_text_command}}
  {{^on_post_text_command}}
  def on_post_text_command(self, command_name, args):
    pass
  {{/on_post_text_command}}

  {{#on_pre_close}}
  def on_pre_close(self):
    return super({{listenerName}}Listener, self).on_pre_close()
  {{/on_pre_close}}
  {{^on_pre_close}}
  def on_pre_close(self):
    pass
  {{/on_pre_close}}

  {{#on_pre_save}}
  def on_pre_save(self):
    return super({{listenerName}}Listener, self).on_pre_save()
  {{/on_pre_save}}
  {{^on_pre_save}}
  def on_pre_save(self):
    pass
  {{/on_pre_save}}

  {{#on_pre_save_async}}
  def on_pre_save_async(self):
    return super({{listenerName}}Listener, self).on_pre_save_async()
  {{/on_pre_save_async}}
  {{^on_pre_save_async}}
  def on_pre_save_async(self):
    pass
  {{/on_pre_save_async}}

  {{#on_query_completions}}
  def on_query_completions(self, prefix, locations):
    return super({{listenerName}}Listener, self).on_query_completions(prefix, locations)
  {{/on_query_completions}}
  {{^on_query_completions}}
  def on_query_completions(self, prefix, locations):
    pass
  {{/on_query_completions}}

  {{#on_query_context}}
  def on_query_context(self, key, operator, operand, match_all):
    return super({{listenerName}}Listener, self).on_query_context(key, operator, operand, match_all)
  {{/on_query_context}}
  {{^on_query_context}}
  def on_query_context(self, key, operator, operand, match_all):
    pass
  {{/on_query_context}}

  {{#on_selection_modified}}
  def on_selection_modified(self):
    return super({{listenerName}}Listener, self).on_selection_modified()
  {{/on_selection_modified}}
  {{^on_selection_modified}}
  def on_selection_modified(self):
    pass
  {{/on_selection_modified}}

  {{#on_selection_modified_async}}
  def on_selection_modified_async(self):
    return super({{listenerName}}Listener, self).on_selection_modified_async()
  {{/on_selection_modified_async}}
  {{^on_selection_modified_async}}
  def on_selection_modified_async(self):
    pass
  {{/on_selection_modified_async}}

  {{#on_text_command}}
  def on_text_command(self, command_name, args):
    return super({{listenerName}}Listener, self).on_text_command(command_name, args)
  {{/on_text_command}}
  {{^on_text_command}}
  def on_text_command(self, command_name, args):
    pass
  {{/on_text_command}}
