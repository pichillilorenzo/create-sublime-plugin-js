// @flow

const util = require('./util.js')

class Region {

  constructor (s) {
    this.self = s
  }

  a (step, value) {
    let code = ""

    if (value === undefined)
      code = `variable_mapping["${this.self.mapTo}"].a`
    else
      code = `variable_mapping["${this.self.mapTo}"].a = ${parseInt(value)}`

    return util.sendEval(code, false, (result, resolve) => {
        resolve(result[0].value)
      }, step)
  }

  b (step, value) {
    let code = ""

    if (value === undefined)
      code = `variable_mapping["${this.self.mapTo}"].b`
    else
      code = `variable_mapping["${this.self.mapTo}"].b = ${parseInt(value)}`

    return util.sendEval(code, false, (result, resolve) => {
        resolve(result[0].value)
      }, step)
  }

  xpos (step, value) {
    let code = ""

    if (value === undefined)
      code = `variable_mapping["${this.self.mapTo}"].xpos`
    else
      code = `variable_mapping["${this.self.mapTo}"].xpos = ${parseInt(value)}`

    return util.sendEval(code, false, (result, resolve) => {
        resolve(result[0].value)
      }, step)
  }

  begin (step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].begin()`, false, (result, resolve) => {
      resolve(result[0].value)
    }, step)
  }

  end (step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].end()`, false, (result, resolve) => {
      resolve(result[0].value)
    }, step)
  }

  size (step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].size()`, false, (result, resolve) => {
      resolve(result[0].value)
    }, step)
  }

  empty (step) {
    return util.sendEval(`variable_mapping["${this.self.mapTo}"].empty()`, false, (result, resolve) => {
      resolve(result[0].value)
    }, step)
  }
}

module.exports = Region