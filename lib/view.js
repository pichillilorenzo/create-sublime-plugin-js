// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      Settings = require('./Settings.js'),
      Window = require('./Window.js'),
      Region = require('./Region.js'),
      Selection = require('./Selection.js')

/**
 * Represents a view ([sublime.View Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime.View)) into a text buffer. Note that multiple views may refer to the same buffer, but they have their own unique selection and geometry.
 */
class View {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  /**
   * Returns a number that uniquely identifies this view.
   */
  id (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].id()`, false, step)
  }

  /**
   * Returns a number that uniquely identifies the buffer underlying this view.
   */
  buffer_id (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].buffer_id()`, false, step)
  }

  /**
   * If the view is the primary view into a file. Will only be ```false``` if the user has opened multiple views into a file.
   */
  is_primary (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].is_primary()`, false, step)
  }

  /**
   * The full name file the file associated with the buffer, or ```null``` if it doesn't exist on disk.
   */
  file_name (step /*: ?StepObject*/) /*: Promise<string | null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].file_name()`, false, step)
  }

  /**
   * The name assigned to the buffer, if any.
   */
  name (step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].name()`, false, step)
  }

  /**
   * Assigns a name to the buffer.
   */
  set_name (name /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_name("""${name}""")`, false, step)
  }

  /**
   * Returns ```true``` if the buffer is still loading from disk, and not ready for use.
   */
  is_loading (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].is_loading()`, false, step)
  }

  /**
   * Returns ```true``` if there are any unsaved modifications to the buffer.
   */
  is_dirty (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].is_dirty()`, false, step)
  }

  /**
   * Returns ```true``` if the buffer may not be modified.
   */
  is_read_only (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].is_read_only()`, false, step)
  }

  /**
   * Sets the read only property on the buffer.
   */
  set_read_only (value /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let readOnly = util.convertToPythonBool(value)
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_read_only(${readOnly})`, false, step)
  }

  /**
   * Returns ```true``` if the buffer is a scratch buffer. Scratch buffers never report as being dirty.
   */
  is_scratch (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].is_scratch()`, false, step)
  }

  /**
   * Sets the scratch property on the buffer.
   */
  set_scratch (value /*: any*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    value = util.convertToPythonBool(value)
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_scratch(${value})`, false, step)
  }

  /**
   * Returns a reference to the view's settings object. Any changes to this settings object will be private to this view.
   */
  settings (step /*: ?StepObject*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].settings()`, true, step, (result, resultObject) => {
      return new Settings(resultObject)
    })
  }

  /**
   * Returns a reference to the window containing the view.
   */
  window (step /*: ?StepObject*/) /*: Promise<Window>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].window()`, true, step, (result, resultObject) => {
      return new Window(resultObject)
    })
  }

  /**
   * Runs the named {@link TextCommand} with the (optional) given args.
   */
  run_command (string /*: any*/, args /*: ?Object*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let code = ''

    if (args)
      code = `${config.variableMappingName}["${this.self.mapTo}"].run_command("""${string}""", json.dumps("""${JSON.stringify(args)}""", ensure_ascii=False))`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].run_command("""${string}""")`

    return util.simpleEval(code, false, step)
  }

  /**
   * Returns the number of character in the file.
   */
  size (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].size()`, false, step)
  }

  /**
   * Returns the contents of the ```region```
   * 
   * or
   * 
   * Returns the character to the right of the ```point``` as a string.
   */
  substr (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<string>*/ {
    let code = ''
    if (regionOrPoint instanceof Region)
      code = `${config.variableMappingName}["${this.self.mapTo}"].substr(${config.variableMappingName}["${regionOrPoint.self.mapTo}"])`
    else {
      code = `${config.variableMappingName}["${this.self.mapTo}"].substr(${regionOrPoint})`
    }
    return util.simpleEval(code, false, step)
  }

  /**
   * Inserts the given ```string``` in the buffer at the specified ```point```. Returns the number of characters inserted: this may be different if tabs are being translated into spaces in the current buffer.
   */
  insert (edit /*: MappedVariable*/, pos /*: number*/, text /*: string*/, step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].insert(${config.variableMappingName}["${edit.mapTo}"], ${pos}, """${text}""")`, false, step)
  }

  /**
   * Erases the contents of the ```region``` from the buffer.
   */
  erase (edit /*: MappedVariable*/, region /*: Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].erase(${config.variableMappingName}["${edit.mapTo}"], ${config.variableMappingName}["${region.self.mapTo}"])`, false, step)
  }

  /**
   * Replaces the contents of the ```region``` with the given string.
   */
  replace (edit /*: MappedVariable*/, region /*: Region*/, string /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].replace(${config.variableMappingName}["${edit.mapTo}"], ${config.variableMappingName}["${region.self.mapTo}"], """${string}""")`, false, step)
  }

  /**
   * Returns a reference to the selection.
   */
  sel (step /*: ?StepObject*/) /*: Promise<Selection>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].sel()`, true, step, (result, resultObject) => {
      return new Selection(resultObject)
    })
  }

  /**
   * Returns a modified copy of ```region``` such that it starts at the beginning of a line, and ends at the end of a line. Note that it may span several lines
   * 
   * or
   * 
   * Returns the line that contains the ```point```.
   */
  line (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<Region>*/ {
    let code = ''
    if (regionOrPoint instanceof Region)
      code = `${config.variableMappingName}["${this.self.mapTo}"].line(${config.variableMappingName}["${regionOrPoint.self.mapTo}"])`
    else {
      code = `${config.variableMappingName}["${this.self.mapTo}"].line(${regionOrPoint})`
    }
    return util.simpleEval(code, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * As [```line()```](#viewline), but the region includes the trailing newline character, if any
   */
  full_line (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<Region>*/ {
    let code = ''
    if (regionOrPoint instanceof Region)
      code = `${config.variableMappingName}["${this.self.mapTo}"].full_line(${config.variableMappingName}["${regionOrPoint.self.mapTo}"])`
    else {
      code = `${config.variableMappingName}["${this.self.mapTo}"].full_line(${regionOrPoint})`
    }
    return util.simpleEval(code, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns a list of lines (in sorted order) intersecting the ```region```.
   */
  lines (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].lines(${config.variableMappingName}["${region.self.mapTo}"])`, false, step, (result, resultObject) => {
      let regions = []
      for (let region of resultObject.value) {
        regions.push(new Region(region))
      }
      return regions
    } )
  }

  /**
   * Splits the ```region``` up such that each region returned exists on exactly one line.
   */
  split_by_newlines (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].split_by_newlines(${config.variableMappingName}["${region.self.mapTo}"])`, false, step, (result, resultObject) => {
      let regions = []
      for (let region of resultObject.value) {
        regions.push(new Region(region))
      }
      return regions
    } )
  }

  /**
   * Returns the word that contains the ```point```
   *
   * or
   *
   * Returns a modified copy of ```region``` such that it starts at the beginning of a word, and ends at the end of a word. Note that it may span several words.
   */
  word (regionOrPoint /*: Region | number*/, step /*: ?StepObject*/) /*: Promise<Region>*/ {
    let code = ''
    if (regionOrPoint instanceof Region)
      code = `${config.variableMappingName}["${this.self.mapTo}"].word(${config.variableMappingName}["${regionOrPoint.self.mapTo}"])`
    else {
      code = `${config.variableMappingName}["${this.self.mapTo}"].word(${regionOrPoint})`
    }
    return util.simpleEval(code, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
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
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].classify(${point})`, false, step)
  }

  /**
   * Finds the next location after point that matches the given ```classes```. If ```forward``` is ```false```, searches backwards instead of forwards. ```classes``` is a bitwise OR of the ```sublime.CLASS_XXX``` flags. ```separators``` may be passed in, to define what characters should be considered to separate words.
   */
  find_by_class (point /*: number*/, forward /*: boolean*/, classes /*: number*/, separators /*: ?string*/ = '', step /*: ?StepObject*/) /*: Promise<number>*/ {
    let forwardPythonBool = util.convertToPythonBool(forward)
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].find_by_class(${point}, ${forwardPythonBool}, ${classes}, """${separators}""")`, false, step)
  }

  /**
   * Expands ```point``` to the left and right, until each side lands on a location that matches ```classes```. ```classes``` is a bitwise OR of the ```sublime.CLASS_XXX``` flags. separators may be passed in, to define what characters should be considered to separate words.
   *
   * or
   *
   * Expands ```region``` to the left and right, until each side lands on a location that matches ```classes```. ```classes``` is a bitwise OR of the ```sublime.CLASS_XXX``` flags. ```separators``` may be passed in, to define what characters should be considered to separate words.
   */
  expand_by_class (regionOrPoint /*: Region | number*/, classes /*: number*/, separators /*: ?string*/ = '', step /*: ?StepObject*/) /*: Promise<Region>*/ {
    let code = ''
    if (regionOrPoint instanceof Region)
      code = `${config.variableMappingName}["${this.self.mapTo}"].expand_by_class(${config.variableMappingName}["${regionOrPoint.self.mapTo}"], ${classes}, """${separators}""")`
    else {
      code = `${config.variableMappingName}["${this.self.mapTo}"].expand_by_class(${regionOrPoint}, ${classes}, """${separators}""")`
    }
    return util.simpleEval(code, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns the first region matching the regex ```pattern```, starting from ```start_point```, or ```null``` if it can't be found. The optional ```flags``` parameter may be [```sublime.LITERAL```](#sublimeliteral), [```sublime.IGNORECASE```](#sublimeignorecase), or the two ORed together.
   */
  find (pattern /*: string*/, start_point /*: number | null*/, flags /*: ?number*/, step /*: ?StepObject*/) /*: Promise<Region>*/ {
    let code = ''
    let startPoint = util.convertToPythonNone(start_point)

    if (flags)
      code = `${config.variableMappingName}["${this.self.mapTo}"].find(${pattern}, ${startPoint}, ${flags})`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].find(${pattern}, ${startPoint})`

    return util.simpleEval(code, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns all (non-overlapping) regions matching the regex ```pattern```. The optional flags parameter may be [```sublime.LITERAL```](#sublimeliteral), [```sublime.IGNORECASE```](#sublimeignorecase), or the two ORed together. If a ```format``` string is given, then all matches will be formatted with the formatted string and placed into the ```extractions``` list.
   */
  /*
  Original method: find_all(pattern, <flags>, <format>, <extractions>)
   */
  find_all (pattern /*: string*/, flags /*: ?number*/, formatAndExtractions /*: ?{format: string, extractions: Array<string>}*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {
    let code = ''

    if (flags)
      code = `${config.variableMappingName}["${this.self.mapTo}"].find_all(${pattern}, ${flags})`
    else
      code = `${config.variableMappingName}["${this.self.mapTo}"].find_all(${pattern})`

    return util.simpleEval(code, false, step, (result, resultObject) => {
      let regions = []
      for (let region of resultObject.value) {
        regions.push(new Region(region))
        if (formatAndExtractions)
          formatAndExtractions.extractions.push(formatAndExtractions.format)
      }
      return regions
    } )
  }

  /**
   * Calculates the 0-based line and column numbers of the ```point```.
   */
  rowcol (point /*: number*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].rowcol(${point})`, false, step)
  }

  /**
   * Calculates the character offset of the given, 0-based, ```row``` and ```col```. Note that ```col``` is interpreted as the number of characters to advance past the beginning of the row.
   */
  text_point (row /*: number*/, col /*: number*/, step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].text_point(${row}, ${col})`, false, step)
  }

  /**
   * Changes the syntax used by the view. ```syntax_file``` should be a name along the lines of ```Packages/Python/Python.tmLanguage```. To retrieve the current syntax, use ```await (await view.settings()).get('syntax')```.
   */
  set_syntax_file (syntax_file /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_syntax_file(${syntax_file})`, false, step)
  }

}

module.exports = View