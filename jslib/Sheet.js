// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      Window = require('./Window.js'),
      View = require('./View.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Represents a content container, i.e. a tab, within a window. Sheets may contain a {@link View}, or an image preview.
 *
 * **NOTE**: use [sublime.Sheet()](#sublimesheet) to instantiate a sheet.
 */
class Sheet extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepRequired /*: boolean*/, codeChainString /*: string*/ = '') {
    super(self, stepRequired, codeChainString)
  }

  /**
   * Returns a number that uniquely identifies this sheet.
   */
  id (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].id()`, false, step)
  }

  /**
   * Returns the window containing the sheet. May be ```null``` if the sheet has been closed.
   */
  window (step /*: ?StepObject*/) /*: Promise<Window> | Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].window()`, true, step, (result, resultObject) => {
      if (result)
        return new Window(resultObject)
      else
        return null
    })
  }

  /**
   * Returns the view contained within the sheet. May be ```null``` if the sheet is an image preview, or the view has been closed.
   */
  view (step /*: ?StepObject*/) /*: Promise<View> | Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].view()`, true, step, (result, resultObject) => {
      if (result)
        return new View(resultObject)
      else
        return null
    })
  }

}

module.exports = Sheet