// @flow

const util = require('./util.js'),
      config = require('./config.js')

class View {

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  insert (edit /*: MappedVariable*/, pos /*: number*/, text /*: string*/, step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].insert(${config.variable_mapping_name}["${edit.mapTo}"], ${parseInt(pos)}, """${text}""")`, false, step)
  }

  is_dirty (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].is_dirty()`, false, step)
  }

  set_scratch (value /*: any*/, step /*: ?StepObject*/) /*: Promise<void>*/ {
    value = util.convertToPythonBool(value)
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].set_scratch(${value})`, false, step)
  }

  substr (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].substr(${config.variable_mapping_name}["${region.self.mapTo}"])`, false, step)
  }
}

module.exports = View