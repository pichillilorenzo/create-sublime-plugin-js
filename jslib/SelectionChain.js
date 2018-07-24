// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      Region = require('./Region.js')

/**
 * Maintains a set of Regions, ensuring that none overlap. The regions are kept in sorted order.
 *
 * **NOTE**: use [sublime.Selection()](#sublimeselection) to instantiate a selection.
 */
class SelectionChain {

  /*::
  self: MappedVariable
  code: string
  */

  constructor (s /*: MappedVariable | null*/, code /*: string*/ = '') {
    this.self = s
    this.code = code
  }

  /**
   * Get the number of selections.
   */
  length () {
    this.code = (this.code == '') ? `len(${config.variableMappingName}["${this.self.mapTo}"])` : `len(${this.code})`
    return this
  }

  /**
   * Adds the given ```region```. It will be merged with any intersecting regions already contained within the set.
   */
  add (region /*: Region*/) {
    this.code = (this.code == '') ? `${config.variableMappingName}["${this.self.mapTo}"].add(${config.variableMappingName}["${region.self.mapTo}"])` : this.code + `.add(${config.variableMappingName}["${region.self.mapTo}"])`
    return this
  }

  run (step) {
    let promise = util.simpleEval(this.code, false, step)
    this.code = ''
    return promise
  }

}

module.exports = SelectionChain