// @flow

const util = require('./util.js'),
      config = require('./config.js')

class Settings {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  get (name /*: string*/, defaultValue /*: ?any*/) /*: Promise<any>*/ {
    if (defaultValue) {
      let mappedVar = util.getMapToVariableName(defaultValue)
      if (mappedVar) {
        return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get("""${name}""", ${config.variableMappingName}["${mappedVar}"])`, false)
      }
      else {
        return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get("""${name}""", json.dumps("""${JSON.stringify(defaultValue)}""", ensure_ascii=False))`, false)
      }
    }
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get("""${name}""")`, false)
  }

  set (name /*: string*/, value /*: any*/) /*: Promise<null>*/ {
    let mappedVar = util.getMapToVariableName(value)
    if (mappedVar) {
      return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get("""${name}""", ${config.variableMappingName}["${mappedVar}"])`, false)
    }
    else {
      return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get("""${name}""", json.dumps("""${JSON.stringify(value)}""", ensure_ascii=False))`, false)
    }
  }

  erase (name /*: string*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].erase("""${name}""")`, false)
  }

  has (name /*: string*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].has("""${name}""")`, false)
  }

  add_on_change (key /*: string*/, callback /*: Function*/) /*: void*/ {
    util.callbackPython(`${config.variableMappingName}["${this.self.mapTo}"].add_on_change("""${key}""", lambda: callback($PORT_TOKEN))`, callback)
  }

  clear_on_change (key /*: string*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].clear_on_change("""${key}""")`, false)
  }
}

module.exports = Settings