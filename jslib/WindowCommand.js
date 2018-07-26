// @flow

const util = require('./util.js'),
      windowCommands = require('./windowCommandList.js'),
      Window = require('./Window.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * WindowCommands are instantiated once per window. The {@link Window} object may be retrieved via ```this.window()```.
 *
 * [sublime_plugin.WindowCommand Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin.WindowCommand).
 */
class WindowCommand extends SublimeObject {

  constructor () {
    super(null, true)
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

  window (step /*: ?StepObject*/) /*: Promise<Window> | Window*/ {

    let methodCode = `window`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Window(null, true, this.codeChainString)
    }, () => {
      this.checkStep(step)
      
      return util.simpleEval(completeCode, true, step, ((result, resultObject) => {
        return new Window(resultObject, this.stepRequired)
      }) )
    }, !!step)

  }

}

module.exports = WindowCommand