// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      View = require('./View.js')

class Window {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  id (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].id()`, false, step)
  }

  new_file (step /*: ?StepObject*/) /*: Promise<View>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].new_file()`, true, step, (result, resultObject) => {
      return new View(resultObject)
    })
  }

  open_file (file_name /*: string*/, flags /*: ?number*/, step /*: ?StepObject*/) /*: Promise<View>*/ {
    let code = ''

    if (flags)
      code = `${config.variableMappingName}["${this.self.mapTo}"].open_file("""${file_name}""", ${flags})`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].open_file("""${file_name}""")`

    return util.simpleEval(code, true, step, (result, resultObject) => {
      return new View(resultObject)
    })
  }

}

module.exports = Window