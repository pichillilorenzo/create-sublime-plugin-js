// @flow

const util = require('./util.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * ([sublime.Settings Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime.Settings)).
 *
 * **NOTE**: use [sublime.Settings()](#sublimesettings) to instantiate a settings.
 */
class Settings extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepObject /*: StepObject | null*/ = null, stepRequired /*: boolean*/ = false, codeChainString /*: string*/ = '') {
    super(self, stepObject, stepRequired, codeChainString)
  }

  /**
   * Returns the named setting, or ```default``` if it's not defined. If not passed, ```default``` will have a value of ```null```.
   */
  get (name /*: string*/, defaultValue /*: ?SublimeObject | any*/, step /*: ?StepObject*/) /*: Promise<any>*/ {

    step = this.checkStep(step)

    let methodCode = ``

    if (defaultValue) {
      if (util.isSublimeObject(defaultValue))
        methodCode = `get("""${name}""", ${defaultValue.getPythonCode()})`
      else
        methodCode = `get("""${name}""", json.loads("""${JSON.stringify(defaultValue)}"""))`
    }
    else
      methodCode = `get("""${name}""")`

    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Sets the named setting. Only primitive types, lists, and dicts are accepted.
   */
  set (name /*: string*/, value /*: any*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let methodCode = ``

    if (util.isSublimeObject(value))
      methodCode = `set("""${name}""", ${value.getPythonCode()})`  
    else
      methodCode = `set("""${name}""", json.loads("""${JSON.stringify(value)}"""))`

    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Removes the named setting. Does not remove it from any parent Settings.
   */
  erase (name /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let methodCode = `erase("""${name}""")`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns ```true``` iff the named option exists in this set of Settings or one of its parents.
   */
  has (name /*: string*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    step = this.checkStep(step)

    let methodCode = `has("""${name}""")`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Register a callback to be run whenever a setting in this object is changed.
   */
  add_on_change (key /*: string*/, callback /*: (?StepObject) => void*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let callbacks = []

    callbacks.push(async (httpTempServers, subStep) => {
      await callback(subStep)

      for (let httpTempServer of httpTempServers) 
        httpTempServer.close()
    })

    let methodCode = `add_on_change("""${key}""", lambda: sublime.set_timeout_async(lambda: callback($PORT_TOKEN)))`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.callbackPython(this.codeChainString, false, callbacks, step)
    }, () => {
      return util.callbackPython(completeCode, false, callbacks, step)
    }, !!step)

  }

  /**
   * Remove all callbacks registered with the given ```key```.
   */
  clear_on_change (key /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let methodCode = `clear_on_change("""${key}""")`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }
}

module.exports = Settings