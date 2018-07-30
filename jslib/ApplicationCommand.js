// @flow

const applicationCommands = require('./applicationCommandList.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * [sublime_plugin.ApplicationCommand Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin.ApplicationCommand).
 */
class ApplicationCommand extends SublimeObject {

  constructor () {
    super(null, null, true)
    applicationCommands[this.constructor.name] = this
  }

  /**
   * Called when the command is run.
   */
  async run (args /*: Object*/, step /*: StepObject*/) /*: Promise<void>*/ {

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
   * Returns ```true``` if a checkbox should be shown next to the menu item. The ```.sublime-menu``` file must have the checkbox attribute set to ```true``` for this to be used.
   */
  async is_checked (args /*: Object*/, step /*: StepObject*/) /*: Promise<boolean>*/ {
    return true
  }

  /**
   * Returns a description of the command with the given arguments. Used in the menu, if no caption is provided. Return ```null``` to get the default description.
   */
  async description (args /*: Object*/, step /*: StepObject*/) /*: Promise<string | null>*/ {
    return null
  }

}

module.exports = ApplicationCommand