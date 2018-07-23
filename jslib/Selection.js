// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      Region = require('./Region.js')

/**
 * Maintains a set of Regions, ensuring that none overlap. The regions are kept in sorted order.
 *
 * **NOTE**: use [sublime.Selection()](#sublimeselection) to instantiate a selection.
 */
class Selection {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  /**
   * Get the specific selection at ```index``` position.
   */
  get (index /*: number*/, step /*: ?StepObject*/) /*: Promise<Region>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"][${index}]`, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Get the number of selections.
   */
  length (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`len(${config.variableMappingName}["${this.self.mapTo}"])`, false, step)
  }

  /**
   * Removes all regions. 
   */
  clear (step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].clear()`, false, step)
  }

  /**
   * Adds the given ```region```. It will be merged with any intersecting regions already contained within the set.
   */
  add (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].add(${config.variableMappingName}["${region.self.mapTo}"])`, false, step)
  }

  /**
   * Adds all regions in the given ```list``` or ```tuple```.
   */
  add_all (regions /*: Array<Region>*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let regionsVariableArray = []
    for (let region of regions)
      regionsVariableArray.push(`${config.variableMappingName}["${region.self.mapTo}"]`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].add_all(${regionsArray})`, false, step)
  }

  /**
   * Subtracts the ```region``` from all regions in the set.
   */
  subtract (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].subtract(${config.variableMappingName}["${region.self.mapTo}"])`, false, step)
  }

  /**
   * Returns ```true``` iff the given ```region``` is a subset.
   */
  contains (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].contains(${config.variableMappingName}["${region.self.mapTo}"])`, false, step)
  }

}

module.exports = Selection