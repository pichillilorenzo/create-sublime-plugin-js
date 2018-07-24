// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      windowCommands = require('./windowCommandList.js'),
      Window = require('./Window.js')

/**
 * WindowCommands are instantiated once per window. The {@link Window} object may be retrieved via ```this.window()```.
 *
 * [sublime_plugin.WindowCommand Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin.WindowCommand).
 */
class WindowCommand {

  /*::
  self: MappedVariable
  */

  constructor () {
    windowCommands[this.constructor.name] = this
  }

  _init (s /*: MappedVariable*/) /*: void*/ {
    this.self = s
  }

  /**
   * Called when the command is run.
   */
  async run(args /*: Object*/, step /*: StepObject*/) /*: Promise<void>*/ {

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
   * Returns a description of the command with the given arguments. Used in the menu, if no caption is provided. Return ```null``` to get the default description.
   */
  async description (args /*: Object*/, step /*: StepObject*/) /*: Promise<string | null>*/ {
    return null
  }

  window (step /*: StepObject*/) /*: Promise<Window>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].window`, true, step, ((result, resultObject) => {
      return new Window(resultObject, true)
    }) )
  }

}

module.exports = WindowCommand