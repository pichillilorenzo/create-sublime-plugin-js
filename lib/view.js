// @flow

const util = require('./util.js')

class View {

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  insert (edit /*: MappedVariable*/, pos /*: number*/, text /*: string*/, step /*: ?StepObject*/) {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].insert(variable_mapping["${edit.mapTo}"], ${parseInt(pos)}, """${text}""")`, false, step)
  }

  is_dirty (step /*: ?StepObject*/) {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].is_dirty()`, false, step)
  }

  set_scratch (value /*: any*/, step /*: ?StepObject*/) {
    value = util.convertToPythonBool(value)
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].set_scratch(${value})`, false, step)
  }

  substr (region /*: Region*/, step /*: ?StepObject*/) {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].substr(variable_mapping["${region.self.mapTo}"])`, false, step)
  }
}

module.exports = View