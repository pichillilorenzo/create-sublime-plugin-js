// @flow

const util = require('./util.js')

class Region {

  constructor (s /*: Object*/) {
    this.self = s
  }

  a (value /*: ?number*/) {
    let code = ""

    if (value === undefined)
      code = `variable_mapping["${this.self.mapTo}"].a`
    else
      code = `variable_mapping["${this.self.mapTo}"].a = ${parseInt(value)}`

    return util.simpleEval(code, false)
  }

  b (value /*: ?number*/) {
    let code = ""

    if (value === undefined)
      code = `variable_mapping["${this.self.mapTo}"].b`
    else
      code = `variable_mapping["${this.self.mapTo}"].b = ${parseInt(value)}`

    return util.simpleEval(code, false)
  }

  xpos (value /*: ?number*/) {
    let code = ""

    if (value === undefined)
      code = `variable_mapping["${this.self.mapTo}"].xpos`
    else
      code = `variable_mapping["${this.self.mapTo}"].xpos = ${parseInt(value)}`

    return util.simpleEval(code, false)
  }

  begin (step /*: ?StepObject*/) {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].begin()`, false, step)
  }

  end (step /*: ?StepObject*/) {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].end()`, false, step)
  }

  size (step /*: ?StepObject*/) {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].size()`, false, step)
  }

  empty (step /*: ?StepObject*/) {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].empty()`, false, step)
  }
}

module.exports = Region