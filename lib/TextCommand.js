// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      textCommands = require('./textCommandList.js'),
      View = require('./View.js')

class TextCommand {

  /*::
  self: MappedVariable
  */

  constructor () {
    textCommands[this.constructor.name] = this
  }

  _init (s /*: MappedVariable*/) /*: void*/ {
    this.self = s
  }

  async run(edit /*: MappedVariable*/, args /*: Object*/, step /*: StepObject*/) /*: Promise<any>*/ {

  }

  view (step /*: StepObject*/) /*: Promise<View>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].view`, true, step, ((result, resultObject) => {
      return new View(resultObject)
    }) )
  }

}

module.exports = TextCommand