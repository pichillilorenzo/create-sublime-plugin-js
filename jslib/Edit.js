// @flow

const SublimeObject = require('./SublimeObject.js')

/**
 * Edit objects have no functions, they exist to group buffer modifications.
 * 
 * Edit objects are passed to {@link TextCommand}s, and can not be created by the user. Using an invalid Edit object, or an Edit object from a different {@link View}, will cause the functions that require them to fail.
 */
class Edit extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepObject /*: StepObject | null*/ = null, stepRequired /*: boolean*/ = false, codeChainString /*: string*/ = '') {
    super(self, stepObject, stepRequired, codeChainString)
  }

}

module.exports = Edit