// @flow

const util = require('./util.js'),
      textCommands = require('./textCommandList.js'),
      View = require('./View.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * TextCommands are instantiated once per view. The {@link View} object may be retrieved via ```this.view()```
 *
 * [sublime_plugin.TextCommand Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin.TextCommand).
 */
class TextCommand extends SublimeObject {

  constructor () {
    super(null, null, true)
    textCommands[this.constructor.name] = this
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

  view (step /*: ?StepObject*/) /*: Promise<View> | View*/ {

    let methodCode = `view`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return new View(null, this.stepObject, this.stepRequired, codeString)
    }, () => {
      step = this.checkStep(step)

      return util.simpleEval(completeCode, true, step, ((result, resultObject) => {
        return new View(resultObject, this.stepObject, this.stepRequired)
      }) )
    }, !!step)

  }

}

module.exports = TextCommand