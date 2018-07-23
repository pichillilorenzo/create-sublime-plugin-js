// @flow

const util = require('./util.js'),
      config = require('./config.js')

/**
 * ([sublime.Settings Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime.Settings)).
 *
 * **NOTE**: use [sublime.Settings()](#sublimesettings) to instantiate a settings.
 */
class Settings {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  /**
   * Returns the named setting, or ```default``` if it's not defined. If not passed, ```default``` will have a value of ```null```.
   */
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

  /**
   * Sets the named setting. Only primitive types, lists, and dicts are accepted.
   */
  set (name /*: string*/, value /*: any*/) /*: Promise<null>*/ {
    let mappedVar = util.getMapToVariableName(value)
    if (mappedVar) {
      return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get("""${name}""", ${config.variableMappingName}["${mappedVar}"])`, false)
    }
    else {
      return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get("""${name}""", json.dumps("""${JSON.stringify(value)}""", ensure_ascii=False))`, false)
    }
  }

  /**
   * Removes the named setting. Does not remove it from any parent Settings.
   */
  erase (name /*: string*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].erase("""${name}""")`, false)
  }

  /**
   * Returns ```true``` iff the named option exists in this set of Settings or one of its parents.
   */
  has (name /*: string*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].has("""${name}""")`, false)
  }

  /**
   * Register a callback to be run whenever a setting in this object is changed.
   */
  add_on_change (key /*: string*/, callback /*: (?StepObject) => void*/) /*: Promise<null>*/ {
    return util.callbackPython(`${config.variableMappingName}["${this.self.mapTo}"].add_on_change("""${key}""", lambda: sublime.set_timeout_async(lambda: callback($PORT_TOKEN)))`, false, [async (httpTempServers, subStep) => {
      await callback(subStep)
      for (let httpTempServer of httpTempServers) 
        httpTempServer.close()
    }])
  }

  /**
   * Remove all callbacks registered with the given ```key```.
   */
  clear_on_change (key /*: string*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].clear_on_change("""${key}""")`, false)
  }
}

module.exports = Settings