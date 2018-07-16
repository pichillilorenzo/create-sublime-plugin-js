// @flow

const util = require('./util.js')

class View {

  constructor (s) {
    this.self = s
  }

  insert (edit, pos, text, step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].insert(variable_mapping["${edit.mapTo}"], ${pos}, """${text}""")`, false, (result, resolve) => {
      resolve(result[0].value)
    }, step)
  }

  is_dirty (step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].is_dirty()`, false, (result, resolve) => {
      resolve(result[0].value)
    }, step)
  }

  set_scratch (value, step) {
    value = util.convertToPythonBool(value)
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].set_scratch(${value})`, false, (result, resolve) => {
      resolve(null)
    }, step)
  }

  substr (region, step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].substr(variable_mapping["${region.self.mapTo}"])`, false, (result, resolve) => {
      resolve(result[0].value)
    }, step)
  }
}

module.exports = View