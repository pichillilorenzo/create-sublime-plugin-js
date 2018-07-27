import sublime_plugin

from ...pylib.JSEventListener import JSEventListener

class {{listenerName}}Listener(JSEventListener, sublime_plugin.EventListener):

  {{#on_activated}}
  def on_activated(self, view):
    return super({{listenerName}}Listener, self).on_activated(view)
  {{/on_activated}}
  {{^on_activated}}
  def on_activated(self, view):
    pass
  {{/on_activated}}

  {{#on_activated_async}}
  def on_activated_async(self, view):
    return super({{listenerName}}Listener, self).on_activated_async(view)
  {{/on_activated_async}}
  {{^on_activated_async}}
  def on_activated_async(self, view):
    pass
  {{/on_activated_async}}

  {{#on_clone}}
  def on_clone(self, view):
    return super({{listenerName}}Listener, self).on_clone(view)
  {{/on_clone}}
  {{^on_clone}}
  def on_clone(self, view):
    pass
  {{/on_clone}}

  {{#on_clone_async}}
  def on_clone_async(self, view):
    return super({{listenerName}}Listener, self).on_clone_async(view)
  {{/on_clone_async}}
  {{^on_clone_async}}
  def on_clone_async(self, view):
    pass
  {{/on_clone_async}}

  {{#on_close}}
  def on_close(self, view):
    return super({{listenerName}}Listener, self).on_close(view)
  {{/on_close}}
  {{^on_close}}
  def on_close(self, view):
    pass
  {{/on_close}}

  {{#on_deactivated}}
  def on_deactivated(self, view):
    return super({{listenerName}}Listener, self).on_deactivated(view)
  {{/on_deactivated}}
  {{^on_deactivated}}
  def on_deactivated(self, view):
    pass
  {{/on_deactivated}}

  {{#on_deactivated_async}}
  def on_deactivated_async(self, view):
    return super({{listenerName}}Listener, self).on_deactivated_async(view)
  {{/on_deactivated_async}}
  {{^on_deactivated_async}}
  def on_deactivated_async(self, view):
    pass
  {{/on_deactivated_async}}

  {{#on_hover}}
  def on_hover(self, view, point, hover_zone):
    return super({{listenerName}}Listener, self).on_hover(view, point, hover_zone)
  {{/on_hover}}
  {{^on_hover}}
  def on_hover(self, view, point, hover_zone):
    pass
  {{/on_hover}}

  {{#on_load}}
  def on_load(self, view):
    return super({{listenerName}}Listener, self).on_load(view)
  {{/on_load}}
  {{^on_load}}
  def on_load(self, view):
    pass
  {{/on_load}}

  {{#on_load_async}}
  def on_load_async(self, view):
    return super({{listenerName}}Listener, self).on_load_async(view)
  {{/on_load_async}}
  {{^on_load_async}}
  def on_load_async(self, view):
    pass
  {{/on_load_async}}

  {{#on_modified}}
  def on_modified(self, view):
    return super({{listenerName}}Listener, self).on_modified(view)
  {{/on_modified}}
  {{^on_modified}}
  def on_modified(self, view):
    pass
  {{/on_modified}}

  {{#on_modified_async}}
  def on_modified_async(self, view):
    return super({{listenerName}}Listener, self).on_modified_async(view)
  {{/on_modified_async}}
  {{^on_modified_async}}
  def on_modified_async(self, view):
    pass
  {{/on_modified_async}}

  {{#on_new}}
  def on_new(self, view):
    return super({{listenerName}}Listener, self).on_new(view)
  {{/on_new}}
  {{^on_new}}
  def on_new(self, view):
    pass
  {{/on_new}}

  {{#on_new_async}}
  def on_new_async(self, view):
    return super({{listenerName}}Listener, self).on_new_async(view)
  {{/on_new_async}}
  {{^on_new_async}}
  def on_new_async(self, view):
    pass
  {{/on_new_async}}

  {{#on_post_save}}
  def on_post_save(self, view):
    return super({{listenerName}}Listener, self).on_post_save(view)
  {{/on_post_save}}
  {{^on_post_save}}
  def on_post_save(self, view):
    pass
  {{/on_post_save}}

  {{#on_post_save_async}}
  def on_post_save_async(self, view):
    return super({{listenerName}}Listener, self).on_post_save_async(view)
  {{/on_post_save_async}}
  {{^on_post_save_async}}
  def on_post_save_async(self, view):
    pass
  {{/on_post_save_async}}

  {{#on_post_text_command}}
  def on_post_text_command(self, view, command_name, args):
    return super({{listenerName}}Listener, self).on_post_text_command(view, command_name, args)
  {{/on_post_text_command}}
  {{^on_post_text_command}}
  def on_post_text_command(self, view, command_name, args):
    pass
  {{/on_post_text_command}}

  {{#on_post_window_command}}
  def on_post_window_command(self, view, command_name, args):
    return super({{listenerName}}Listener, self).on_post_window_command(view, command_name, args)
  {{/on_post_window_command}}
  {{^on_post_window_command}}
  def on_post_window_command(self, view, command_name, args):
    pass
  {{/on_post_window_command}}

  {{#on_pre_close}}
  def on_pre_close(self, view):
    return super({{listenerName}}Listener, self).on_pre_close(view)
  {{/on_pre_close}}
  {{^on_pre_close}}
  def on_pre_close(self, view):
    pass
  {{/on_pre_close}}

  {{#on_pre_save}}
  def on_pre_save(self, view):
    return super({{listenerName}}Listener, self).on_pre_save(view)
  {{/on_pre_save}}
  {{^on_pre_save}}
  def on_pre_save(self, view):
    pass
  {{/on_pre_save}}

  {{#on_pre_save_async}}
  def on_pre_save_async(self, view):
    return super({{listenerName}}Listener, self).on_pre_save_async(view)
  {{/on_pre_save_async}}
  {{^on_pre_save_async}}
  def on_pre_save_async(self, view):
    pass
  {{/on_pre_save_async}}

  {{#on_query_completions}}
  def on_query_completions(self, view, prefix, locations):
    return super({{listenerName}}Listener, self).on_query_completions(view, prefix, locations)
  {{/on_query_completions}}
  {{^on_query_completions}}
  def on_query_completions(self, view, prefix, locations):
    pass
  {{/on_query_completions}}

  {{#on_query_context}}
  def on_query_context(self, view, key, operator, operand, match_all):
    return super({{listenerName}}Listener, self).on_query_context(view, key, operator, operand, match_all)
  {{/on_query_context}}
  {{^on_query_context}}
  def on_query_context(self, view, key, operator, operand, match_all):
    pass
  {{/on_query_context}}

  {{#on_selection_modified}}
  def on_selection_modified(self, view):
    return super({{listenerName}}Listener, self).on_selection_modified(view)
  {{/on_selection_modified}}
  {{^on_selection_modified}}
  def on_selection_modified(self, view):
    pass
  {{/on_selection_modified}}

  {{#on_selection_modified_async}}
  def on_selection_modified_async(self, view):
    return super({{listenerName}}Listener, self).on_selection_modified_async(view)
  {{/on_selection_modified_async}}
  {{^on_selection_modified_async}}
  def on_selection_modified_async(self, view):
    pass
  {{/on_selection_modified_async}}

  {{#on_text_command}}
  def on_text_command(self, view, command_name, args):
    return super({{listenerName}}Listener, self).on_text_command(view, command_name, args)
  {{/on_text_command}}
  {{^on_text_command}}
  def on_text_command(self, view, command_name, args):
    pass
  {{/on_text_command}}

  {{#on_window_command}}
  def on_window_command(self, view, command_name, args):
    return super({{listenerName}}Listener, self).on_window_command(view, command_name, args)
  {{/on_window_command}}
  {{^on_window_command}}
  def on_window_command(self, view, command_name, args):
    pass
  {{/on_window_command}}