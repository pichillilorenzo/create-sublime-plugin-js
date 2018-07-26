// @flow

const util = require('./util.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * A collection that manages {@link Phantoms} and the process of adding them, updating them and removing them from the {@link View}.
 *
 * **NOTE**: use [sublime.PhantomSet()](#sublimephantomset) to instantiate a phantomset.
 */
class PhantomSet extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepObject /*: StepObject | null*/ = null, stepRequired /*: boolean*/ = false, codeChainString /*: string*/ = '') {
    super(self, stepObject, stepRequired, codeChainString)
  }

  /**
   * ```phantoms``` should be a list of phantoms.
   * 
   * The ```.region``` attribute of each existing phantom in the set will be updated. New phantoms will be added to the view and phantoms not in ```phantoms``` list will be deleted.
   */
  update (phantoms /*: Array<Phantom>*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let phantomsVariableArray = []

    for (let phantom of phantoms)
      phantomsVariableArray.push(`${phantom.getPythonCode()}`)
    
    let phantomsArray = '[' + phantomsVariableArray.join(',') + ']'

    let methodCode = `update(${phantomsArray})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }
}

module.exports = PhantomSet