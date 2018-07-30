// @flow

const eventListenerList = require('./eventListenerList.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Note that many of these events are triggered by the buffer underlying the view, and thus the method is only called once, with the first view as the parameter.
 * 
 * [sublime_plugin.EventListener Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin.EventListener).
 */
class EventListener extends SublimeObject {

  constructor () {
    super(null, null, true)
    eventListenerList[this.constructor.name] = this
  }

  /**
   * Called when a new buffer is created.
   */
  async on_new (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a new buffer is created. Runs in a separate thread, and does not block the application.
   */
  async on_new_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view is cloned from an existing one.
   */
  async on_clone (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view is cloned from an existing one. Runs in a separate thread, and does not block the application.
   */
  async on_clone_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when the file is finished loading.
   */
  async on_load (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when the file is finished loading. Runs in a separate thread, and does not block the application.
   */
  async on_load_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view is about to be closed. The view will still be in the window at this point.
   */
  async on_pre_close (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view is closed (note, there may still be other views into the same buffer).
   */
  async on_close (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called just before a view is saved.
   */
  async on_pre_save (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called just before a view is saved. Runs in a separate thread, and does not block the application.
   */
  async on_pre_save_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called after a view has been saved.
   */
  async on_post_save (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called after a view has been saved. Runs in a separate thread, and does not block the application.
   */
  async on_post_save_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called after changes have been made to a view.
   */
  async on_modified (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called after changes have been made to a view. Runs in a separate thread, and does not block the application.
   */
  async on_modified_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called after the selection has been modified in a view.
   */
  async on_selection_modified (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called after the selection has been modified in a view. Runs in a separate thread, and does not block the application.
   */
  async on_selection_modified_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view gains input focus.
   */
  async on_activated (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view gains input focus. Runs in a separate thread, and does not block the application.
   */
  async on_activated_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view loses input focus.
   */
  async on_deactivated (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when a view loses input focus. Runs in a separate thread, and does not block the application.
   */
  async on_deactivated_async (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when the user's mouse hovers over a view for a short period.
   * 
   * ```point``` is the closest point in the view to the mouse location. The mouse may not actually be located adjacent based on the value of ```hover_zone```:
   * - ```sublime.HOVER_TEXT```: When the mouse is hovered over text.
   * - ```sublime.HOVER_GUTTER```: When the mouse is hovered over the gutter.
   * - ```sublime.HOVER_MARGIN```: When the mouse is hovered in whitespace to the right of a line.
   */
  async on_hover (view /*: View*/, point /*: number*/, hover_zone /*: number*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called when determining to trigger a key binding with the given context ```key```. If the plugin knows how to respond to the context, it should return either ```true``` of ```false```. If the context is unknown, it should return ```null```.
   * 
   * ```operator``` is one of:
   * - ```sublime.OP_EQUAL```: Is the value of the context equal to the operand?
   * - ```sublime.OP_NOT_EQUAL```: Is the value of the context not equal to the operand?
   * - ```sublime.OP_REGEX_MATCH```: Does the value of the context match the regex given in operand?
   * - ```sublime.OP_NOT_REGEX_MATCH```: Does the value of the context not match the regex given in operand?
   * - ```sublime.OP_REGEX_CONTAINS```: Does the value of the context contain a substring matching the regex given in operand?
   * - ```sublime.OP_NOT_REGEX_CONTAINS```: Does the value of the context not contain a substring matching the regex given in operand?
   * 
   * ```match_all``` should be used if the context relates to the selections: does every selection have to match (```match_all == true```), or is at least one matching enough (```match_all == false```)?
   */
  async on_query_context (view /*: View*/, key /*: string*/, operator /*: number*/, operand /*: boolean*/, match_all /*: boolean*/, step /*: StepObject*/) /*: Promise<boolean | void>*/ {

  }

  /**
   * Called whenever completions are to be presented to the user. The ```prefix``` is a unicode string of the text to complete.
   * 
   * ```locations``` is a list of points. Since this method is called for all completions no matter the syntax, ```self.view.match_selector(point, relevant_scope)``` should be called to determine if the point is relevant.
   * 
   * The return value must be one of the following formats:
   * - ```null```: no completions are provided
   * 
   *   ```
   *   return null
   *   ```
   *   
   * - A list of 2-element lists/tuples. The first element is a unicode string of the completion trigger, the second is the unicode replacement text.
   * 
   *   ```
   *   return [["me1", "method1()"], ["me2", "method2()"]]
   *   ```
   *   
   *   The trigger may contain a tab character (```\t```) followed by a hint to display in the right-hand side of the completion box.
   *   
   *   ```
   *   return [
   *       ["me1\tmethod", "method1()"],
   *       ["me2\tmethod", "method2()"]
   *   ]
   *   ```
   *   
   *   The replacement text may contain dollar-numeric fields such as a snippet does, e.g. ```$0```, ```$1```.
   *   
   *   ```
   *   return [
   *       ["fn", "def ${1:name}($2) { $0 }"],
   *       ["for", "for ($1; $2; $3) { $0 }"]
   *   ]
   *   ```
   *   
   * - A 2-element tuple with the first element being the list format documented above, and the second element being bit flags from the following list:
   *   - ```sublime.INHIBIT_WORD_COMPLETIONS```: prevent Sublime Text from showing completions based on the contents of the view
   *   - ```sublime.INHIBIT_EXPLICIT_COMPLETIONS```: prevent Sublime Text from showing completions based on ```.sublime-completions``` files
   *   
   *   ```
   *   return [
   *       [
   *           ["me1", "method1()"],
   *           ["me2", "method2()"]
   *       ],
   *       sublime.INHIBIT_WORD_COMPLETIONS | sublime.INHIBIT_EXPLICIT_COMPLETIONS
   *   ]
   *   ```
   */
  async on_query_completions (view /*: View*/, prefix /*: string*/, locations /*: Array<number>*/, step /*: StepObject*/) /*: Promise<Array<[Array<[string, string]>, number]> | Array<[string, string]> | void>*/ {

  }

  /**
   * Called when a text command is issued. The listener may return a ```(command, arguments)``` tuple to rewrite the command, or ```null``` to run the command unmodified.
   */
  async on_text_command (view /*: View*/, command_name /*: string*/, args /*: Object*/, step /*: StepObject*/) /*: Promise<[string, Object] | void>*/ {

  }

  /**
   * Called when a window command is issued. The listener may return a ```(command, arguments)``` tuple to rewrite the command, or ```null``` to run the command unmodified.
   */
  async on_window_command (view /*: View*/, command_name /*: string*/, args /*: Object*/, step /*: StepObject*/) /*: Promise<[string, Object] | void>*/ {

  }

  /**
   * Called after a text command has been executed.
   */
  async on_post_text_command (view /*: View*/, command_name /*: string*/, args /*: Object*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Called after a window command has been executed.
   */
  async on_post_window_command (view /*: View*/, command_name /*: string*/, args /*: Object*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

}

module.exports = EventListener