// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      Settings = require('./Settings.js'),
      Window = require('./Window.js'),
      Region = require('./Region.js'),
      SelectionChain = require('./SelectionChain.js')


class ViewChain {

  /*::
  self: MappedVariable
  code: string
  */

  constructor (s /*: MappedVariable | null*/, code /*: string*/ = '') {
    this.self = s
    this.code = code
  }

  /**
   * Returns a reference to the selection.
   */
  sel () /*: any*/ {
    this.code = (this.code == '') ? `${config.variableMappingName}["${this.self.mapTo}"].sel()` : this.code + '.sel()'
    let code = this.code
    this.code = ''
    return new SelectionChain(null, code)
  }

  run (step) {
    let promise = util.simpleEval(this.code, false, step)
    this.code = ''
    return promise
  }

}


module.exports = ViewChain