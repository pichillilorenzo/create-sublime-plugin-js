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

  constructor (self /*: MappedVariable | null*/, stepObject /*: StepObject | null*/ = null, stepRequired /*: boolean*/ = false, codeChainString /*: string*/ = '') {
    super(self, stepObject, stepRequired, codeChainString)
  }

  /**
   * Get the specific selection at ```index``` position.
   */
  get (index /*: number*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = `[${index}]`
    let completeCode = `${this.getPythonCode()}${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `${methodCode}`
    }, (codeString) => {
      return new Region(null, this.stepObject, this.stepRequired, codeString)
    }, () => {
      step = this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Get the number of selections.
   */
  length (step /*: ?StepObject*/) /*: Promise<number>*/ {

    step = this.checkStep(step)

    let completeCode = `len(${this.getPythonCode()})`

    return this.wrapMethod({
      complete: completeCode,
      pre: `len(`,
      after: `)`
    }, (codeString) => {
      return util.simpleEval(codeString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Removes all regions. 
   */
  clear (step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let methodCode = `clear()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return util.simpleEval(codeString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Adds the given ```region```. It will be merged with any intersecting regions already contained within the set.
   */
  add (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let methodCode = `add(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return util.simpleEval(codeString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Adds all regions in the given ```list``` or ```tuple```.
   */
  add_all (regions /*: Array<Region>*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let regionsVariableArray = []

    for (let region of regions)
      regionsVariableArray.push(`${region.getPythonCode()}`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    let methodCode = `add_all(${regionsArray})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return util.simpleEval(codeString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Subtracts the ```region``` from all regions in the set.
   */
  subtract (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    step = this.checkStep(step)

    let methodCode = `subtract(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return util.simpleEval(codeString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns ```true``` iff the given ```region``` is a subset.
   */
  contains (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    step = this.checkStep(step)

    let methodCode = `contains(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, (codeString) => {
      return util.simpleEval(codeString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

}

module.exports = Selection