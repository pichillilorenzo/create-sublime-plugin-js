// @flow

const util = require('./util.js'),
      textCommands = require('./textCommandList.js'),
      View = require('./view.js')

class TextCommand {

  constructor () {
    textCommands[this.constructor.name] = this
  }

  _init (s, e, a, k) {
    this.self = s
    this.edit = e
    this.args = a
    this.kwargs = k
  }

  async run(edit, args, kwargs, step) {

  }

  view (step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].view`, true, (result, resolve) => {
      resolve(new View(result[0]))
    }, step)
  }

  freeMemory (step, ...args) {
    args = args.map((item) => {return JSON.stringify(item)})
    if (args.length > 0) 
      return util.sendEval(`freeMemory([${args.join(',')}])`, false, (result, resolve) => {
        resolve()
      }, step)
    else
      return util.sendEval("freeMemory(variable_created)", false, (result, resolve) => {
        resolve()
      }, step)
  }
}

module.exports = TextCommand