// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      textCommands = require('./textCommandList.js'),
      View = require('./View.js')

/**
 * TextCommands are instantiated once per view. The {@link View} object may be retrieved via ```this.view()```
 *
 * [sublime_plugin.TextCommand Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin.TextCommand).
 */
class TextCommand {

  /*::
  self: MappedVariable
  */

  constructor () {
    textCommands[this.constructor.name] = this
  }

  _init (s /*: MappedVariable*/) /*: void*/ {
    this.self = s
  }

  /**
   * Called when the command is run.
   */
  async run (edit /*: MappedVariable*/, args /*: Object*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

  /**
   * Returns ```true``` if the command is able to be run at this time. The default implementation simply always returns ```true```.
   */
  async is_enabled (args /*: Object*/, step /*: StepObject*/) /*: Promise<boolean>*/ {
    return true
  }

  /**
   * Returns ```true``` if the command should be shown in the menu at this time. The default implementation always returns ```true```.
   */
  async is_visible (args /*: Object*/, step /*: StepObject*/) /*: Promise<boolean>*/ {
    return true
  }

  /**
   * Returns a description of the command with the given arguments. Used in the menus, and for Undo / Redo descriptions. Return ```null``` to get the default description.
   */
  async description (args /*: Object*/, step /*: StepObject*/) /*: Promise<string | null>*/ {
    return null
  }

  /**
   * Return ```true``` to receive an ```event``` argument when the command is triggered by a mouse action. The event information allows commands to determine which portion of the view was clicked on. The default implementation returns ```false```.
   */
  async want_event (step /*: StepObject*/) /*: Promise<boolean>*/ {
    return false
  }

  view (step /*: StepObject*/) /*: Promise<View>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].view`, true, step, ((result, resultObject) => {
      return new View(resultObject)
    }) )
  }

}

module.exports = TextCommand