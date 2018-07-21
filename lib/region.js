// @flow

const util = require('./util.js'),
      config = require('./config.js')

class Region {

  /*::
  self: MappedVariable
  */

  constructor (s /*: Object*/) {
    this.self = s
  }

  a (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variableMappingName}["${this.self.mapTo}"].a`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].a = ${value}`

    return util.simpleEval(code, false)
  }

  b (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variableMappingName}["${this.self.mapTo}"].b`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].b = ${value}`

    return util.simpleEval(code, false)
  }

  xpos (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variableMappingName}["${this.self.mapTo}"].xpos`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].xpos = ${value}`

    return util.simpleEval(code, false)
  }

  begin () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].begin()`, false)
  }

  end () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].end()`, false)
  }

  size () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].size()`, false)
  }

  empty () /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].empty()`, false)
  }
}

module.exports = Region