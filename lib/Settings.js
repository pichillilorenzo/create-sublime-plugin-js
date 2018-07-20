// @flow

const util = require('./util.js'),
      config = require('./config.js')

class Settings {

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  get (name /*: string*/, defaultValue /*: ?any*/) /*: Promise<any>*/ {
    if (defaultValue) {
      let mappedVar = util.getMapToVariableName(defaultValue)
      if (mappedVar) {
        return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].get("""${name}""", ${config.variable_mapping_name}["${mappedVar}"])`, false)
      }
      else {
        return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].get("""${name}""", json.dumps("""${JSON.stringify(defaultValue)}""", ensure_ascii=False))`, false)
      }
    }
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].get("""${name}""")`, false)
  }

  set (name /*: string*/, value /*: any*/) /*: Promise<void>*/ {
    let mappedVar = util.getMapToVariableName(value)
    if (mappedVar) {
      return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].get("""${name}""", ${config.variable_mapping_name}["${mappedVar}"])`, false)
    }
    else {
      return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].get("""${name}""", json.dumps("""${JSON.stringify(value)}""", ensure_ascii=False))`, false)
    }
  }

  erase (name /*: string*/) /*: Promise<void>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].erase("""${name}""")`, false)
  }

  has (name /*: string*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].has("""${name}""")`, false)
  }

  add_on_change (key /*: string*/, callback /*: Function*/) /*: void*/ {
    util.callbackPython(`${config.variable_mapping_name}["${this.self.mapTo}"].add_on_change("""${key}""", lambda: callback($PORT_TOKEN))`, callback)
  }

  clear_on_change (key /*: string*/) /*: Promise<void>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].clear_on_change("""${key}""")`, false)
  }
}

module.exports = Settings