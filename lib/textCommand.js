// @flow

const util = require('./util.js'),
      textCommands = require('./textCommandList.js'),
      View = require('./View.js')

class TextCommand {

  constructor () {
    textCommands[this.constructor.name] = this
  }

  _init (s /*: MappedVariable*/) /*: void*/ {
    this.self = s
  }

  async run(edit /*: MappedVariable*/, args /*: Object*/, step /*: StepObject*/) /*: Promise<any>*/ {

  }

  view (step /*: StepObject*/) /*: Promise<View>*/ {
    return util.simpleEval(`variable_mapping["${this.self.mapTo}"].view`, true, step, ((result, resultObject) => {
      return new View(resultObject)
    }) )
  }

  freeMemory (step /*: StepObject*/, ...args /*: Array<any>*/) /*: Promise<any>*/ {
    if (args.length > 0) 
      // $Ignore
      return util.freeMemory(args, step)
    else
      return util.simpleEval('freeMemory(variable_created)', false, step)
  }
}

module.exports = TextCommand