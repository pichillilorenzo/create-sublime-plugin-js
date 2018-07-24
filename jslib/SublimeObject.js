// @flow

const util = require('./util.js'),
      config = require('./config.js')

class SublimeObject {

  /*::
  self: MappedVariable | null
  codeChainString: string
  stepRequired: boolean
  */

  constructor (self /*: MappedVariable | null*/, stepRequired /*: boolean*/, codeChainString /*: string*/ = '') {
    this.self = self
    this.stepRequired = stepRequired
    this.codeChainString = codeChainString
  }

  wrapMethod (code /*: {complete: string, pre: string, after: string}*/, chainCallback /*: Function*/, callback /*: Function*/, execCallback /*: boolean*/) /*: Promise<any> | any*/ {
    if (execCallback) {
      this.codeChainString = ''
      return callback()
    }
    if (this.codeChainString == '')
      this.codeChainString = code.complete
    else
      this.codeChainString = code.pre + this.codeChainString + code.after

    let result = chainCallback()
    this.codeChainString = ''
    return result
  }

  isNull (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    this.checkStep(step)

    let code = this.getPythonCode()
    return util.simpleEval(code, false, step, (result, resultObject) => {
      return result != 'SublimeObject'
    })
  }

  checkStep (step /*: ?StepObject*/) /*: void*/ {
    if (this.stepRequired && !step)
      throw new Error(`"step" parameter required!`)
  }

  getMapToCode () /*: string*/ {
    return (this.self) ? `${config.variableMappingName}["${this.self.mapTo}"]` : ''
  }

  getPythonCode () /*: string*/ {
    return (this.self) ? this.getMapToCode() : this.codeChainString
  }
  
}

module.exports = SublimeObject