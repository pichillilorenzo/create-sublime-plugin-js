// @flow

const util = require('./util.js'),
      config = require('./config.js')

/**
 * Represents an area of the buffer. Empty regions, where ```a == b``` are valid.
 *
 * **NOTE**: use [sublime.Region()](#sublimeregion) to instantiate a region.
 */
class Region {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  /**
   * The first end of the region.
   */
  a (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variableMappingName}["${this.self.mapTo}"].a`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].a = ${value}`

    return util.simpleEval(code, false)
  }

  /**
   * The second end of the region. May be less that a, in which case the region is a reversed one.
   */
  b (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variableMappingName}["${this.self.mapTo}"].b`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].b = ${value}`

    return util.simpleEval(code, false)
  }

  /**
   * The target horizontal position of the region, or ```-1``` if undefined. Effects behavior when pressing the up or down keys.
   */
  xpos (value /*: ?number*/) /*: Promise<?number>*/ {
    let code = ""

    if (value === undefined)
      code = `${config.variableMappingName}["${this.self.mapTo}"].xpos`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].xpos = ${value}`

    return util.simpleEval(code, false)
  }

  /**
   * Returns the minimum of a and b.
   */
  begin () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].begin()`, false)
  }

  /**
   * Returns the maximum of a and b.
   */
  end () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].end()`, false)
  }

  /**
   * Returns the number of characters spanned by the region. Always >= 0.
   */
  size () /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].size()`, false)
  }

  /**
   * Returns ```true``` iff ```begin()``` == ```end()```.
   */
  empty () /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].empty()`, false)
  }

  /**
   * Returns a Region spanning both this and the given regions.
   */
  cover (region /*: Region*/) /*: Promise<Region>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].cover(${config.variableMappingName}["${region.self.mapTo}"])`, true, null, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns the set intersection of the two regions.
   */
  intersection (region /*: Region*/) /*: Promise<Region>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].intersection(${config.variableMappingName}["${region.self.mapTo}"])`, true, null, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns ```true``` iff self == ```region``` or both include one or more positions in common.
   */
  intersects (region /*: Region*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].intersects(${config.variableMappingName}["${region.self.mapTo}"])`, false)
  }

  /**
   * Returns ```true``` iff self == ```region``` or both include one or more positions in common.
   *
   * or
   *
   * Returns ```true``` iff ```begin()``` <= ```point``` <= ```end()```.
   */
  contains (regionOrPoint /*: Region | number*/) /*: Promise<boolean>*/ {
    let code = ''

    if (regionOrPoint instanceof Region)
      code = `${config.variableMappingName}["${this.self.mapTo}"].contains(${config.variableMappingName}["${regionOrPoint.self.mapTo}"])`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].contains(${regionOrPoint})`

    return util.simpleEval(code, false)
  }

}

module.exports = Region