// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      Window = require('./Window.js'),
      View = require('./View.js')

class Sheet {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  id (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].id()`, false, step)
  }

  window (step /*: ?StepObject*/) /*: Promise<Window> | Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].window()`, true, step, (result, resultObject) => {
      if (result)
        return new Window(resultObject)
      else
        return null
    })
  }

  view (step /*: ?StepObject*/) /*: Promise<View> | Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].view()`, true, step, (result, resultObject) => {
      if (result)
        return new View(resultObject)
      else
        return null
    })
  }

}

module.exports = Sheet