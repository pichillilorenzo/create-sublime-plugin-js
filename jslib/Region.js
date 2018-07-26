// @flow

const util = require('./util.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Represents an area of the buffer. Empty regions, where ```a == b``` are valid.
 *
 * **NOTE**: use [sublime.Region()](#sublimeregion) to instantiate a region.
 */
class Region extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepRequired /*: boolean*/, codeChainString /*: string*/ = '') {
    super(self, stepRequired, codeChainString)
  }

  /**
   * The first end of the region.
   */
  a (step /*: ?StepObject*/, value /*: ?number*/) /*: Promise<?number>*/ {

    this.checkStep(step)

    let methodCode = (value === undefined) ? `a` : `a = ${value}`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * The second end of the region. May be less that a, in which case the region is a reversed one.
   */
  b (step /*: ?StepObject*/, value /*: ?number*/) /*: Promise<?number>*/ {

    this.checkStep(step)

    let methodCode = (value === undefined) ? `b` : `b = ${value}`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * The target horizontal position of the region, or ```-1``` if undefined. Effects behavior when pressing the up or down keys.
   */
  xpos (step /*: ?StepObject*/, value /*: ?number*/) /*: Promise<?number>*/ {

    this.checkStep(step)

    let methodCode = (value === undefined) ? `xpos` : `xpos = ${value}`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns the minimum of a and b.
   */
  begin (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `begin()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns the maximum of a and b.
   */
  end (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `end()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns the number of characters spanned by the region. Always >= 0.
   */
  size (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `size()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns ```true``` iff ```begin()``` == ```end()```.
   */
  empty (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `empty()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns a Region spanning both this and the given regions.
   */
  cover (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    this.checkStep(step)

    let methodCode = `cover(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      return util.simpleEval(completeCode, true, null, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      }, step)
    }, !!step)

  }

  /**
   * Returns the set intersection of the two regions.
   */
  intersection (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    this.checkStep(step)

    let methodCode = `intersection(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      return util.simpleEval(completeCode, true, null, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      }, step)
    }, !!step)

  }

  /**
   * Returns ```true``` iff self == ```region``` or both include one or more positions in common.
   */
  intersects (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `intersects(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

  /**
   * Returns ```true``` iff self == ```region``` or both include one or more positions in common.
   *
   * or
   *
   * Returns ```true``` iff ```begin()``` <= ```point``` <= ```end()```.
   */
  contains (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = (regionOrPoint instanceof Region) ? `contains(${regionOrPoint.getPythonCode()})` : `contains(${regionOrPoint})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!step)

  }

}

module.exports = Region