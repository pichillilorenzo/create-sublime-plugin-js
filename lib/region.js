// @flow

const util = require('./util.js'),
      config = require('./config')

class Region {

  constructor (s /*: Object*/) {
    this.self = s
  }

  a (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].a`
    else
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].a = ${parseInt(value)}`

    return util.simpleEval(code, false)
  }

  b (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].b`
    else
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].b = ${parseInt(value)}`

    return util.simpleEval(code, false)
  }

  xpos (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].xpos`
    else
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].xpos = ${parseInt(value)}`

    return util.simpleEval(code, false)
  }

  begin () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].begin()`, false)
  }

  end () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].end()`, false)
  }

  size () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].size()`, false)
  }

  empty () /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].empty()`, false)
  }
}

module.exports = Region