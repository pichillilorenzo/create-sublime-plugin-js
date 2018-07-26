// @flow

const SublimeObject = require('./SublimeObject.js')

/**
 * Represents an HTML-based decoration to display non-editable content interspersed in a {@link View}. Used with {@link PhantomSet} to actually add the phantoms to the View. Once a Phantom has been constructed and added to the {@link View}, changes to the attributes will have no effect.
 *
 * **NOTE**: use [sublime.Phantom()](#sublimephantom) to instantiate a phantom.
 */
class Phantom extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepObject /*: StepObject | null*/ = null, stepRequired /*: boolean*/ = false, codeChainString /*: string*/ = '') {
    super(self, stepObject, stepRequired, codeChainString)
  }

}

module.exports = Phantom