// @flow

const util = require('./util.js'),
      Settings = require('./Settings.js'),
      Window = require('./Window.js'),
      Region = require('./Region.js'),
      Selection = require('./Selection.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Represents a view ([sublime.View Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime.View)) into a text buffer. Note that multiple views may refer to the same buffer, but they have their own unique selection and geometry.
 *
 * **NOTE**: use [sublime.View()](#sublimeview) to instantiate a view.
 */
class View extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepRequired /*: boolean*/, codeChainString /*: string*/ = '') {
    super(self, stepRequired, codeChainString)
  }

  /**
   * Returns a number that uniquely identifies this view.
   */
  id (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `id()`
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
   * Returns a number that uniquely identifies the buffer underlying this view.
   */
  buffer_id (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `buffer_id()`
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
   * If the view is the primary view into a file. Will only be ```false``` if the user has opened multiple views into a file.
   */
  is_primary (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_primary()`
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
   * The full name file the file associated with the buffer, or ```null``` if it doesn't exist on disk.
   */
  file_name (step /*: ?StepObject*/) /*: Promise<string | null>*/ {

    this.checkStep(step)

    let methodCode = `file_name()`
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
   * The name assigned to the buffer, if any.
   */
  name (step /*: ?StepObject*/) /*: Promise<string>*/ {

    this.checkStep(step)

    let methodCode = `name()`
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
   * Assigns a name to the buffer.
   */
  set_name (name /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_name("""${name}""")`
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
   * Returns ```true``` if the buffer is still loading from disk, and not ready for use.
   */
  is_loading (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_loading()`
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
   * Returns ```true``` if there are any unsaved modifications to the buffer.
   */
  is_dirty (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_dirty()`
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
   * Returns ```true``` if the buffer may not be modified.
   */
  is_read_only (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_read_only()`
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
   * Sets the read only property on the buffer.
   */
  set_read_only (value /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let readOnly = util.convertToPythonBool(value)

    this.checkStep(step)

    let methodCode = `set_read_only(${readOnly})`
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
   * Returns ```true``` if the buffer is a scratch buffer. Scratch buffers never report as being dirty.
   */
  is_scratch (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_scratch()`
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
   * Sets the scratch property on the buffer.
   */
  set_scratch (value /*: any*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    value = util.convertToPythonBool(value)

    this.checkStep(step)

    let methodCode = `set_scratch(${value})`
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
   * Returns a reference to the view's settings object. Any changes to this settings object will be private to this view.
   */
  settings (step /*: ?StepObject*/) /*: Promise<Settings> | Settings*/ {

    let methodCode = `settings()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Settings(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Settings(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Returns a reference to the window containing the view.
   */
  window (step /*: ?StepObject*/) /*: Promise<Window> | Window*/ {

    let methodCode = `window()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Window(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Window(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Runs the named {@link TextCommand} with the (optional) given args.
   */
  run_command (string /*: string*/, args /*: Object | null*/ = null, step /*: ?StepObject*/) /*: Promise<null>*/ {
    
    this.checkStep(step)

    let methodCode = `run_command("""${string}""", json.loads("""${JSON.stringify(args)}"""))`
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
   * Returns the number of character in the file.
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
   * Returns the contents of the ```region```
   * 
   * or
   * 
   * Returns the character to the right of the ```point``` as a string.
   */
  substr (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<string>*/ {

    this.checkStep(step)

    let methodCode = (regionOrPoint instanceof Region) ? `substr(${regionOrPoint.getPythonCode()})` : `substr(${regionOrPoint})`
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
   * Inserts the given ```string``` in the buffer at the specified ```point```. Returns the number of characters inserted: this may be different if tabs are being translated into spaces in the current buffer.
   */
  insert (edit /*: Edit*/, pos /*: number*/, text /*: string*/, step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `insert(${edit.getPythonCode()}, ${pos}, """${text}""")`
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
   * Erases the contents of the ```region``` from the buffer.
   */
  erase (edit /*: Edit*/, region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `erase(${edit.getPythonCode()}, ${region.getPythonCode()})`
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
   * Replaces the contents of the ```region``` with the given string.
   */
  replace (edit /*: Edit*/, region /*: Region*/, string /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `replace(${edit.getPythonCode()}, ${region.getPythonCode()}, """${string}""")`
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
   * Returns a reference to the selection.
   */
  sel (step /*: ?StepObject*/) /*: Promise<Selection> | Selection*/ {

    let methodCode = `sel()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Selection(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Selection(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Returns a modified copy of ```region``` such that it starts at the beginning of a line, and ends at the end of a line. Note that it may span several lines
   * 
   * or
   * 
   * Returns the line that contains the ```point```.
   */
  line (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = (regionOrPoint instanceof Region) ? `line(${regionOrPoint.getPythonCode()})` : `line(${regionOrPoint})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * As [```line()```](#viewline), but the region includes the trailing newline character, if any
   */
  full_line (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = (regionOrPoint instanceof Region) ? `full_line(${regionOrPoint.getPythonCode()})` : `full_line(${regionOrPoint})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Returns a list of lines (in sorted order) intersecting the ```region```.
   */
  lines (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {

    this.checkStep(step)

    let methodCode = `lines(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`
    
    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      })
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      })
    }, !!step)

  }

  /**
   * Splits the ```region``` up such that each region returned exists on exactly one line.
   */
  split_by_newlines (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {

    this.checkStep(step)

    let methodCode = `split_by_newlines(${region.getPythonCode()})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`
    
    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      })
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      })
    }, !!step)

  }

  /**
   * Returns the word that contains the ```point```
   *
   * or
   *
   * Returns a modified copy of ```region``` such that it starts at the beginning of a word, and ends at the end of a word. Note that it may span several words.
   */
  word (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = (regionOrPoint instanceof Region) ? `word(${regionOrPoint.getPythonCode()})` : `word(${regionOrPoint})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Classifies point, returning a bitwise OR of zero or more of these flags:
   * - [```sublime.CLASS_WORD_START```](#sublimeclass_word_start)
   * - [```sublime.CLASS_WORD_END```](#sublimeclass_word_end)
   * - [```sublime.CLASS_PUNCTUATION_START```](#sublimeclass_punctuation_start)
   * - [```sublime.CLASS_PUNCTUATION_END```](#sublimeclass_punctuation_end)
   * - [```sublime.CLASS_SUB_WORD_START```](#sublimeclass_sub_word_start)
   * - [```sublime.CLASS_SUB_WORD_END```](#sublimeclass_sub_word_end)
   * - [```sublime.CLASS_LINE_START```](#sublimeclass_line_start)
   * - [```sublime.CLASS_LINE_END```](#sublimeclass_line_end)
   * - [```sublime.CLASS_EMPTY_LINE```](#sublimeclass_empty_lin)
   */
  classify (point /*: number*/, step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `classify(${point})`
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
   * Finds the next location after point that matches the given ```classes```. If ```forward``` is ```false```, searches backwards instead of forwards. ```classes``` is a bitwise OR of the ```sublime.CLASS_XXX``` flags. ```separators``` may be passed in, to define what characters should be considered to separate words.
   */
  find_by_class (point /*: number*/, forward /*: boolean*/, classes /*: number*/, separators /*: string*/ = '', step /*: ?StepObject*/) /*: Promise<number>*/ {

    let forwardPythonBool = util.convertToPythonBool(forward)

    this.checkStep(step)

    let methodCode = `find_by_class(${point}, ${forwardPythonBool}, ${classes}, """${separators}""")`
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
   * Expands ```point``` to the left and right, until each side lands on a location that matches ```classes```. ```classes``` is a bitwise OR of the ```sublime.CLASS_XXX``` flags. separators may be passed in, to define what characters should be considered to separate words.
   *
   * or
   *
   * Expands ```region``` to the left and right, until each side lands on a location that matches ```classes```. ```classes``` is a bitwise OR of the ```sublime.CLASS_XXX``` flags. ```separators``` may be passed in, to define what characters should be considered to separate words.
   */
  expand_by_class (regionOrPoint /*: Region | number*/, classes /*: number*/, separators /*: string*/ = '', step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = (regionOrPoint instanceof Region) ? `expand_by_class(${regionOrPoint.getPythonCode()}, ${classes}, """${separators}""")` : `expand_by_class(${regionOrPoint}, ${classes}, """${separators}""")`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Returns the first region matching the regex ```pattern```, starting from ```start_point```, or ```null``` if it can't be found. The optional ```flags``` parameter may be [```sublime.LITERAL```](#sublimeliteral), [```sublime.IGNORECASE```](#sublimeignorecase), or the two ORed together.
   */
  find (pattern /*: string*/, start_point /*: number | null*/, flags /*: number*/ = 0, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let startPoint = util.convertToPythonNone(start_point)

    let methodCode = `find(${pattern}, ${startPoint}, ${flags})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Returns all (non-overlapping) regions matching the regex ```pattern```. The optional flags parameter may be [```sublime.LITERAL```](#sublimeliteral), [```sublime.IGNORECASE```](#sublimeignorecase), or the two ORed together. If a ```format``` string is given, then all matches will be formatted with the formatted string and placed into the ```extractions``` list.
   * 
   * The official method in Python is: ```find_all(pattern, <flags>, <format>, <extractions>)```
   */
  find_all (pattern /*: string*/, flags /*: number*/ = 0, formatAndExtractions /*: ?{format: string, extractions: Array<string>}*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {

    this.checkStep(step)

    let methodCode = `find_all(${pattern}, ${flags})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`
    
    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
          if (formatAndExtractions)
            formatAndExtractions.extractions.push(formatAndExtractions.format)
        }
        return regions
      })
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
          if (formatAndExtractions)
            formatAndExtractions.extractions.push(formatAndExtractions.format)
        }
        return regions
      })
    }, !!step)

  }

  /**
   * Calculates the 0-based line and column numbers of the ```point```.
   */
  rowcol (point /*: number*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `rowcol(${point})`
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
   * Calculates the character offset of the given, 0-based, ```row``` and ```col```. Note that ```col``` is interpreted as the number of characters to advance past the beginning of the row.
   */
  text_point (row /*: number*/, col /*: number*/, step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `text_point(${row}, ${col})`
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
   * Changes the syntax used by the view. ```syntax_file``` should be a name along the lines of ```Packages/Python/Python.tmLanguage```. To retrieve the current syntax, use ```await (await view.settings()).get('syntax')```.
   */
  set_syntax_file (syntax_file /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_syntax_file(${syntax_file})`
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
   * Returns the extent of the syntax scope name assigned to the character at the given ```point```.
   */
  extract_scope (point /*: number*/, step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = `extract_scope(${point})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        if (result == "SublimeObject")
          return new Region(resultObject, this.stepRequired)
        else
          return null
      })
    }, !!step)

  }

  /**
   * Returns the syntax scope name assigned to the character at the given ```point```.
   */
  scope_name (point /*: number*/, step /*: ?StepObject*/) /*: Promise<string>*/ {

    this.checkStep(step)

    let methodCode = `scope_name(${point})`
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
   * Checks the ```selector``` against the scope at the given ```point```, returning a bool if they match.
   */
  match_selector (point /*: number*/, selector /*: string*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `match_selector(${point}, """${selector}""")`
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
   * Matches the ```selector``` against the scope at the given ```point```, returning a score. A score of ```0``` means no match, above ```0``` means a match. Different selectors may be compared against the same scope: a higher score means the selector is a better match for the scope.
   */
  score_selector (point /*: number*/, selector /*: string*/, step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `score_selector(${point}, """${selector}""")`
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
   * Finds all regions in the file matching the given ```selector```, returning them as a list.
   */
  find_by_selector (selector /*: string*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {

    this.checkStep(step)

    let methodCode = `find_by_selector(${selector})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      } )
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      } )
    }, !!step)

  }

  /**
   * Scroll the view to show the given ```location```, which may be a point, [Region](#region) or [Selection](#selection).
   */
  show (location /*: number | Region | Selection*/, show_surrounds /*: ?boolean*/ = false, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let showSurrounds = util.convertToPythonBool(show_surrounds)

    this.checkStep(step)

    let methodCode = (location instanceof Region || location instanceof Selection) ? `show(${location.getPythonCode()}, ${showSurrounds})` : `show(${location}, ${showSurrounds})`
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
   * Scroll the view to center on the ```location```, which may be a point or [Region](#region).
   */
  show_at_center (location /*: number | Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = (location instanceof Region) ? `show_at_center(${location.getPythonCode()})` : `show_at_center(${location})`
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
   * Returns the currently visible area of the view.
   */
  visible_region (step /*: ?StepObject*/) /*: Promise<Region> | Region*/ {

    let methodCode = `visible_region()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Region(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Region(resultObject, this.stepRequired)
      })
    }, !!step)

  }

  /**
   * Returns the offset of the viewport in layout coordinates.
   */
  viewport_position (step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `viewport_position()`
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
   * Scrolls the viewport to the given layout position.
   */
  set_viewport_position (vector /*: [number, number]*/, animate /*: boolean*/,step /*: ?StepObject*/) /*: Promise<null>*/ {

    let animateBool = util.convertToPythonBool(animate)

    this.checkStep(step)

    let methodCode = `set_viewport_position((${vector[0]}, ${vector[1]}), ${animateBool})`
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
   * Returns the width and height of the viewport.
   */
  viewport_extent (step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `viewport_extent()`
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
   * Returns the width and height of the layout.
   */
  layout_extent (step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `layout_extent()`
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
   * Converts a text point to a layout position.
   */
  text_to_layout (point /*: number*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `text_to_layout(${point})`
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
   * Converts a text point to a window position.
   */
  text_to_window (point /*: number*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `text_to_window(${point})`
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
   * Converts a layout position to a text point.
   */
  layout_to_text (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `layout_to_text((${vector[0]}, ${vector[1]}))`
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
   * Converts a layout position to a window position.
   */
  layout_to_window (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `layout_to_window((${vector[0]}, ${vector[1]}))`
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
   * Converts a window position to a layout position.
   */
  window_to_layout (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `window_to_layout((${vector[0]}, ${vector[1]}))`
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
   * Converts a window position to a text point.
   */
  window_to_text (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `window_to_text((${vector[0]}, ${vector[1]}))`
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
   * Returns the light height used in the layout.
   */
  line_height (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `line_height()`
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
   * Returns the typical character width used in the layout.
   */
  em_width (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `em_width()`
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
   * Add a set of ```regions``` to the view. If a set of ```regions``` already exists with the given key, they will be overwritten. The ```scope``` is used to source a color to draw the ```regions``` in, it should be the name of a scope, such as ```"comment"``` or ```"string"```. If the ```scope``` is empty, the ```regions``` won't be drawn.
   * The optional ```icon``` name, if given, will draw the named icons in the gutter next to each region. The ```icon``` will be tinted using the color associated with the scope. Valid icon names are ```dot```, ```circle``` and ```bookmark```. The icon name may also be a full package relative path, such as ```Packages/Theme - Default/dot.png```.
   * 
   * The optional ```flags``` parameter is a bitwise combination of:
   * - [```sublime.DRAW_EMPTY```](#sublimedraw_empty): Draw empty regions with a vertical bar. By default, they aren't drawn at all.
   * - [```sublime.HIDE_ON_MINIMAP```](#sublimehide_on_minimap) Don't show the regions on the minimap.
   * - [```sublime.DRAW_EMPTY_AS_OVERWRITE```](#sublimedraw_empty_as_overwrite) Draw empty regions with a horizontal bar instead of a vertical one.
   * - [```sublime.DRAW_NO_FILL```](#sublimedraw_no_fill) Disable filling the regions, leaving only the outline.
   * - [```sublime.DRAW_NO_OUTLINE```](#sublimedraw_no_outline) Disable drawing the outline of the regions.
   * - [```sublime.DRAW_SOLID_UNDERLINE```](#sublimedraw_solid_underline) Draw a solid underline below the regions.
   * - [```sublime.DRAW_STIPPLED_UNDERLINE```](#sublimedraw_stippled_underline) Draw a stippled underline below the regions.
   * - [```sublime.DRAW_SQUIGGLY_UNDERLINE```](#sublimedraw_squiggly_underline) Draw a squiggly underline below the regions.
   * - [```sublime.PERSISTENT```](#sublimepersistent) Save the regions in the session.
   * - [```sublime.HIDDEN```](#sublimehidden) Don't draw the regions.
   * 
   * The underline styles are exclusive, either zero or one of them should be given. If using an underline, ```sublime.DRAW_NO_FILL``` and ```sublime.DRAW_NO_OUTLINE``` should generally be passed in.
   */
  add_regions (key /*: string*/, regions /*: Array<Region>*/, scope /*: string*/ = '', icon /*: string*/ = '', flags /*: number*/ = 0, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let regionsVariableArray = []
    for (let region of regions)
      regionsVariableArray.push(`${region.getPythonCode()}`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    let methodCode = `add_regions(${key}, ${regionsArray}, """${scope}""", """${icon}""", ${flags})`
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
   * Return the regions associated with the given ```key```, if any.
   */
  get_regions (key /*: string*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {

    this.checkStep(step)

    let methodCode = `get_regions("""${key}""")`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      } )
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      } )
    }, !!step)

  }

  /**
   * Removed the named regions.
   */
  erase_regions (key /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `erase_regions("""${key}""")`
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
   * Adds the status ```key``` to the view. The ```value``` will be displayed in the status bar, in a comma separated list of all status ```values```, ordered by key. Setting the value to the empty string will clear the status.
   */
  set_status (key /*: string*/, value /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_status("""${key}""", """${value}""")`
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
   * Returns the previously assigned value associated with the ```key```, if any.
   */
  get_status (key /*: string*/, step /*: ?StepObject*/) /*: Promise<string>*/ {

    this.checkStep(step)

    let methodCode = `get_status("""${key}""")`
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
   * Clears the named status.
   */
  erase_status (key /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `erase_status("""${key}""")`
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
   * Returns the command name, command arguments, and repeat count for the given history entry, as stored in the undo / redo stack.
   * 
   * Index ```0``` corresponds to the most recent command, ```-1``` the command before that, and so on. Positive values for index indicate to look in the redo stack for commands. If the undo / redo history doesn't extend far enough, then ```(null, null, 0)``` will be returned.
   * 
   * Setting ```modifying_only``` to ```true``` (the default is ```false```) will only return entries that modified the buffer.
   */
  command_history (index /*: number*/, modifying_only /*: boolean*/ = false, step /*: ?StepObject*/) /*: Promise<[string | null, Object | null, number]>*/ {

    let modifyingOnly = util.convertToPythonBool(modifying_only)

    this.checkStep(step)

    let methodCode = `command_history(${index}, ${modifyingOnly})`
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
   * Returns the current change count. Each time the buffer is modified, the change count is incremented. The change count can be used to determine if the buffer has changed since the last it was inspected.
   */
  change_count (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `change_count()`
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
   * Folds the given ```regions```, returning ```false``` if they were already folded
   *
   * or
   *
   * Folds the given ```region```, returning ```false``` if it was already folded.
   */
  fold (regions /*: Region | Array<Region>*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let regionsVariableArray = []

    if (regions instanceof Region)
      regions = [regions]

    for (let region of regions)
      regionsVariableArray.push(`${region.getPythonCode()}`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    let methodCode = `.fold(${regionsArray})`
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
   * Unfolds all text in the ```regions```, returning the unfolded regions
   *
   * or
   *
   * Unfolds all text in the ```region```, returning the unfolded regions.
   */
  unfold (regions /*: Region | Array<Region>*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {

    this.checkStep(step)

    let regionsVariableArray = []

    if (regions instanceof Region)
      regions = [regions]

    for (let region of regions)
      regionsVariableArray.push(`${region.getPythonCode()}`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    let methodCode = `.unfold(${regionsArray})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      } )
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let regions = []
        for (let region of resultObject.value) {
          regions.push(new Region(region, this.stepRequired))
        }
        return regions
      } )
    }, !!step)

  }

  /**
   * Returns the encoding currently associated with the file.
   */
  encoding (step /*: ?StepObject*/) /*: Promise<string>*/ {

    this.checkStep(step)

    let methodCode = `encoding()`
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
   * Applies a new encoding to the file. This encoding will be used the next time the file is saved.
   */
  set_encoding (encoding /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_encoding("""${encoding}""")`
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
   * Returns the line endings used by the current file.
   */
  line_endings (step /*: ?StepObject*/) /*: Promise<string>*/ {

    this.checkStep(step)

    let methodCode = `line_endings()`
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
   * Sets the line endings that will be applied when next saving.
   */
  set_line_endings (line_endings /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_line_endings("""${line_endings}""")`
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
   * Returns the overwrite status, which the user normally toggles via the insert key.
   */
  overwrite_status (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `overwrite_status()`
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
   * Sets the overwrite status.
   */
  set_overwrite_status (enabled /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let enabledBool = util.convertToPythonBool(enabled)

    this.checkStep(step)

    let methodCode = `set_overwrite_status(${enabledBool})`
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
   * Extract all the symbols defined in the buffer.
   */
  symbols (step /*: ?StepObject*/) /*: Promise<Array<[Region, string]>>*/ {

    this.checkStep(step)

    let methodCode = `symbols()`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let symbols = []
        for (let symbol of resultObject.value) {
          symbols.push([new Region(symbol[0], this.stepRequired), symbol[1]])
        }
        return symbols
      } )
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let symbols = []
        for (let symbol of resultObject.value) {
          symbols.push([new Region(symbol[0], this.stepRequired), symbol[1]])
        }
        return symbols
      } )
    }, !!step)

  }

  /**
   * Shows a pop up menu at the caret, to select an item in a list. ```on_done``` will be called once, with the index of the selected item. If the pop up menu was cancelled, ```on_done``` will be called with an argument of ```-1```.
   * 
   * ```items``` is a list of strings.
   * 
   * ```flags``` it currently unused.
   */
  show_popup_menu (items /*: Array<string>*/, on_done /*: (number, ?StepObject) => void*/, flags /*: number*/ = 0, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let callbacks = []

    callbacks.push(async (httpTempServers, index, subStep) => {
      await on_done(index, subStep)
      httpTempServers.close()
    })

    let methodCode = `show_popup_menu(json.loads("""${JSON.stringify(items)}"""), lambda index: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, index)), ${flags})`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.callbackPython(this.codeChainString, false, callbacks, step)
    }, () => {
      return util.callbackPython(completeCode, false, callbacks, step)
    }, !!step)

  }

  /**
   * Shows a popup displaying HTML content.
   * 
   * ```flags``` is a bitwise combination of the following:
   * - ```sublime.COOPERATE_WITH_AUTO_COMPLETE```. Causes the popup to display next to the auto complete menu
   * - ```sublime.HIDE_ON_MOUSE_MOVE```. Causes the popup to hide when the mouse is moved, clicked or scrolled
   * - ```sublime.HIDE_ON_MOUSE_MOVE_AWAY```. Causes the popup to hide when the mouse is moved (unless towards the popup), or when clicked or scrolled
   * 
   * The default ```location``` of ```-1``` will display the popup at the cursor, otherwise a text point should be passed.
   * 
   * ```max_width``` and ```max_height``` set the maximum dimensions for the popup, after which scroll bars will be displayed.
   * 
   * ```on_navigate``` is a callback that should accept a string contents of the ```href``` attribute on the link the user clicked.
   * 
   * ```on_hide``` is called when the popup is hidden.
   */
  show_popup (content /*: string*/, flags /*: number*/ = 0, location /*: number*/ = -1, max_width /*: number*/ = 320, max_height /*: number*/ = 240, on_navigate /*: ?(string, ?StepObject) => void*/, on_hide /*: ?(?StepObject) => void*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let callbacks = []

    callbacks.push(async (httpTempServers, href, subStep) => {
      if (on_navigate)
        await on_navigate(href, subStep)
    })

    callbacks.push(async (httpTempServers, subStep) => {

      if (on_hide)
        await on_hide(subStep)

      for (let httpTempServer of httpTempServers) 
        httpTempServer.close()
    })

    let methodCode = `show_popup("""${content}""", ${flags}, ${location}, ${max_width}, ${max_height}, lambda href: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, href)), lambda: sublime.set_timeout_async(lambda: callback($PORT_TOKEN)))`
    let completeCode = `${this.getPythonCode()}.${methodCode}`

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.callbackPython(this.codeChainString, false, callbacks, step)
    }, () => {
      return util.callbackPython(completeCode, false, callbacks, step)
    }, !!step)

  }

  /**
   * Updates the contents of the currently visible popup.
   */
  update_popup (content /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `update_popup("""${content}""")`
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
   * Returns if the popup is currently shown.
   */
  is_popup_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_popup_visible()`
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
   * Hides the popup.
   */
  hide_popup (step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `hide_popup()`
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
   * Returns if the auto complete menu is currently visible.
   */
  is_auto_complete_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_auto_complete_visible()`
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
   * Returns an ```object``` of the global style settings for the view. _All colors are normalized to the six character hex form with a leading hash, e.g. ```#ff0000```_.
   */
  style (step /*: ?StepObject*/) /*: Promise<Object>*/ {

    this.checkStep(step)

    let methodCode = `style()`
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
   * Accepts a string scope name and returns an ```object``` of style information, include the keys ```foreground```, ```bold```, ```italic```, ```source_line```, ```source_column``` and ```source_file```. If the scope has a background color set, the key ```background``` will be present. _The foreground and background colors are normalized to the six character hex form with a leading hash, e.g. ```#ff0000```_.
   */
  style_for_scope (scope_name /*: string*/, step /*: ?StepObject*/) /*: Promise<Object>*/ {

    this.checkStep(step)

    let methodCode = `style_for_scope("""${scope_name}""")`
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

module.exports = View