// @flow

const util = require('./util.js'),
      Region = require('./Region.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Maintains a set of Regions, ensuring that none overlap. The regions are kept in sorted order.
 *
 * **NOTE**: use [sublime.Selection()](#sublimeselection) to instantiate a selection.
 */
class Selection extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepRequired /*: boolean*/, codeChainString /*: string*/ = '') {
    super(self, stepRequired, codeChainString)
  }

  /**
   * Get the specific selection at ```index``` position.
   */
  get (index /*: number*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = `[${index}]`
    let completeCode = (this.self) ? `${this.getMapToCode()}${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Get the number of selections.
   */
  length (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let completeCode = (this.self) ? `len(${this.getMapToCode()})` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: `len(`,
      after: `)`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Removes all regions. 
   */
  clear (step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `clear()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Adds the given ```region```. It will be merged with any intersecting regions already contained within the set.
   */
  add (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `add(${region.getMapToCode()})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Adds all regions in the given ```list``` or ```tuple```.
   */
  add_all (regions /*: Array<Region>*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let regionsVariableArray = []

    for (let region of regions)
      regionsVariableArray.push(`${region.getMapToCode()}`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    let methodCode = `add_all(${regionsArray})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Subtracts the ```region``` from all regions in the set.
   */
  subtract (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `subtract(${region.getMapToCode()})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns ```true``` iff the given ```region``` is a subset.
   */
  contains (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `contains(${region.getMapToCode()})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

}

module.exports = Selection