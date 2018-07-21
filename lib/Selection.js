// @flow

const util = require('./util.js'),
      config = require('./config.js')

class Selection {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  clear (step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].clear()`, false, step)
  }

  add (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].add(${config.variableMappingName}["${region.self.mapTo}"])`, false, step)
  }

  add_all (regions /*: Array<Region>*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let regionsVariableArray = []
    for (let region of regions)
      regionsVariableArray.push(`${config.variableMappingName}["${region.self.mapTo}"]`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].add_all(${regionsArray})`, false, step)
  }

  subtract (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].subtract(${config.variableMappingName}["${region.self.mapTo}"])`, false, step)
  }

  contains (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].contains(${config.variableMappingName}["${region.self.mapTo}"])`, false, step)
  }

}

module.exports = Selection