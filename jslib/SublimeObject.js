// @flow

const util = require('./util.js'),
      config = require('./config.js')

class SublimeObject {

  /*::
  self: MappedVariable | null
  codeChainString: string
  stepRequired: boolean
  stepObject: StepObject | null
  */

  constructor (self /*: MappedVariable | null*/, stepObject /*: StepObject | null*/ = null, stepRequired /*: boolean*/ = false, codeChainString /*: string*/ = '') {
    this.self = self
    this.stepRequired = stepRequired
    this.codeChainString = codeChainString
    this.stepObject = stepObject
  }

  _init (self /*: MappedVariable*/, step /*: StepObject*/) /*: void*/ {
    this.self = self
    this.stepObject = step
  }

  wrapMethod (code /*: {complete: string, pre: string, after: string}*/, chainCallback /*: (string) => any*/, callback /*: () => any*/, execCallback /*: boolean*/) /*: Promise<any> | any*/ {
    if (execCallback) {
      return callback()
    }

    let codeString = ''

    if (this.codeChainString == '')
      codeString = code.complete
    else
      codeString = code.pre + this.codeChainString + code.after

    let result = chainCallback(codeString)
    return result
  }

  isNull (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    step = this.checkStep(step)

    let code = this.getPythonCode()
    return util.simpleEval(code, false, step, (result, resultObject) => {
      return result != 'SublimeObject'
    })
  }

  checkStep (step /*: StepObject | null*/ = null) /*: StepObject | null*/ {
    if (this.stepRequired && !step && !this.stepObject)
      throw new Error(`"step" parameter required!`)
    else if (this.stepRequired && step)
      return step
    else if (this.stepRequired && this.stepObject)
      return this.stepObject
    return step
  }

  getMapToCode () /*: string*/ {
    return (this.self) ? `${config.variableMappingName}["${this.self.mapTo}"]` : ''
  }

  getPythonCode () /*: string*/ {
    return (this.self) ? this.getMapToCode() : this.codeChainString
  }

  free (step /*: ?StepObject*/) /*: Promise<any> | void*/ {
    step = this.checkStep(step)
    return util.freeMemory([this], step)
  }
  
}

module.exports = SublimeObject