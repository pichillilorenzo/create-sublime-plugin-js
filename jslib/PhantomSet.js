// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * A collection that manages {@link Phantoms} and the process of adding them, updating them and removing them from the {@link View}.
 *
 * **NOTE**: use [sublime.PhantomSet()](#sublimephantomset) to instantiate a phantomset.
 */
class PhantomSet extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepRequired /*: boolean*/, codeChainString /*: string*/ = '') {
    super(self, stepRequired, codeChainString)
  }

  /**
   * ```phantoms``` should be a list of phantoms.
   * 
   * The ```.region``` attribute of each existing phantom in the set will be updated. New phantoms will be added to the view and phantoms not in ```phantoms``` list will be deleted.
   */
  update (phantoms /*: Array<Phantom>*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let phantomsVariableArray = []

    for (let phantom of phantoms)
      phantomsVariableArray.push(`${config.variableMappingName}["${phantom.self.mapTo}"]`)
    
    let phantomsArray = '[' + phantomsVariableArray.join(',') + ']'

    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].update(${phantomsArray})`, false, step)
  }
}

module.exports = PhantomSet