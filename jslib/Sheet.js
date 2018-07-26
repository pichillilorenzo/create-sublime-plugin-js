// @flow

const util = require('./util.js'),
      Window = require('./Window.js'),
      View = require('./View.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Represents a content container, i.e. a tab, within a window. Sheets may contain a {@link View}, or an image preview.
 *
 * **NOTE**: use [sublime.Sheet()](#sublimesheet) to instantiate a sheet.
 */
class Sheet extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepObject /*: StepObject | null*/ = null, stepRequired /*: boolean*/ = false, codeChainString /*: string*/ = '') {
    super(self, stepObject, stepRequired, codeChainString)
  }

  /**
   * Returns a number that uniquely identifies this sheet.
   */
  id (step /*: ?StepObject*/) /*: Promise<number>*/ {

    step = this.checkStep(step)

    let methodCode = `id()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return util.simpleEval(codeString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns the window containing the sheet. May be ```null``` if the sheet has been closed.
   */
  window (step /*: ?StepObject*/) /*: Promise<Window | null> | Window*/ {

    let methodCode = `window()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return new Window(null, this.stepObject, this.stepRequired, codeString)
    }, () => {
      step = this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        if (result)
          return new Window(resultObject, this.stepObject, this.stepRequired)
        else
          return null
      })
    }, !!step)

  }

  /**
   * Returns the view contained within the sheet. May be ```null``` if the sheet is an image preview, or the view has been closed.
   */
  view (step /*: ?StepObject*/) /*: Promise<View | null> | View*/ {

    let methodCode = `view()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return new View(null, this.stepObject, this.stepRequired, codeString)
    }, () => {
      step = this.checkStep(step)
      
      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        if (result)
          return new View(resultObject, this.stepObject, this.stepRequired)
        else
          return null
      })
    }, !!step)

  }

}

module.exports = Sheet