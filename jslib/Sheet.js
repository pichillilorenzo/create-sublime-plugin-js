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

    this.checkStep(step)

    let methodCode = `id()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns the window containing the sheet. May be ```null``` if the sheet has been closed.
   */
  window (step /*: ?StepObject*/) /*: Promise<Window | null> | Window*/ {

    this.checkStep(step)

    let methodCode = `window()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Window(null, this.stepRequired, this.codeChainString)
    }, () => {
      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        if (result)
          return new Window(resultObject, this.stepRequired)
        else
          return null
      })
    }, !!(step && this.self))

  }

  /**
   * Returns the view contained within the sheet. May be ```null``` if the sheet is an image preview, or the view has been closed.
   */
  view (step /*: ?StepObject*/) /*: Promise<View | null> | View*/ {

    this.checkStep(step)

    let methodCode = `view()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        if (result)
          return new View(resultObject, this.stepRequired)
        else
          return null
      })
    }, !!(step && this.self))

  }

}

module.exports = Sheet