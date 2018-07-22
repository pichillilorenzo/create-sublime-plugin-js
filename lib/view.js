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
      code = `${config.variableMappingName}["${this.self.mapTo}"].run_command("""${string}""", json.loads("""${JSON.stringify(args)}"""))`
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
  find (pattern /*: string*/, start_point /*: number | null*/, flags /*: ?number*/ = 0, step /*: ?StepObject*/) /*: Promise<Region>*/ {
    let code = ''
    let startPoint = util.convertToPythonNone(start_point)
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].find(${pattern}, ${startPoint}, ${flags})`, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns all (non-overlapping) regions matching the regex ```pattern```. The optional flags parameter may be [```sublime.LITERAL```](#sublimeliteral), [```sublime.IGNORECASE```](#sublimeignorecase), or the two ORed together. If a ```format``` string is given, then all matches will be formatted with the formatted string and placed into the ```extractions``` list.
   * 
   * The official method in Python is: ```find_all(pattern, <flags>, <format>, <extractions>)```
   */
  find_all (pattern /*: string*/, flags /*: ?number*/ = 0, formatAndExtractions /*: ?{format: string, extractions: Array<string>}*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].find_all(${pattern}, ${flags})`, false, step, (result, resultObject) => {
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

  /**
   * Returns the extent of the syntax scope name assigned to the character at the given ```point```.
   */
  extract_scope (point /*: number*/, step /*: ?StepObject*/) /*: Promise<Region>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].extract_scope(${point})`, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns the syntax scope name assigned to the character at the given ```point```.
   */
  scope_name (point /*: number*/, step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].scope_name(${point})`, false, step)
  }

  /**
   * Checks the ```selector``` against the scope at the given ```point```, returning a bool if they match.
   */
  match_selector (point /*: number*/, selector /*: string*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].match_selector(${point}, """${selector}""")`, false, step)
  }

  /**
   * Matches the ```selector``` against the scope at the given ```point```, returning a score. A score of ```0``` means no match, above ```0``` means a match. Different selectors may be compared against the same scope: a higher score means the selector is a better match for the scope.
   */
  score_selector (point /*: number*/, selector /*: string*/, step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].score_selector(${point}, """${selector}""")`, false, step)
  }

  /**
   * Finds all regions in the file matching the given ```selector```, returning them as a list.
   */
  find_by_selector (selector /*: string*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].find_by_selector(${selector})`, false, step, (result, resultObject) => {
      let regions = []
      for (let region of resultObject.value) {
        regions.push(new Region(region))
      }
      return regions
    } )
  }

  /**
   * Scroll the view to show the given ```location```, which may be a point, [Region](#region) or [Selection](#selection).
   */
  show (location /*: number | Region | Selection*/, show_surrounds /*: ?boolean*/ = false, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let code = ''
    let showSurrounds = util.convertToPythonBool(show_surrounds)

    if (location instanceof Region || location instanceof Selection)
      code = `${config.variableMappingName}["${this.self.mapTo}"].show(${config.variableMappingName}["${location.self.mapTo}"], ${showSurrounds})`
    else {
      code = `${config.variableMappingName}["${this.self.mapTo}"].show(${location}, ${showSurrounds})`
    }

    return util.simpleEval(code, false, step)
  }

  /**
   * Scroll the view to center on the ```location```, which may be a point or [Region](#region).
   */
  show_at_center (location /*: number | Region*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let code = ''

    if (location instanceof Region)
      code = `${config.variableMappingName}["${this.self.mapTo}"].show_at_center(${config.variableMappingName}["${location.self.mapTo}"])`
    else {
      code = `${config.variableMappingName}["${this.self.mapTo}"].show_at_center(${location})`
    }
    
    return util.simpleEval(code, false, step)
  }

  /**
   * Returns the currently visible area of the view.
   */
  visible_region (step /*: ?StepObject*/) /*: Promise<Region>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].visible_region()`, true, step, (result, resultObject) => {
      return new Region(resultObject)
    })
  }

  /**
   * Returns the offset of the viewport in layout coordinates.
   */
  viewport_position (step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].viewport_position()`, false, step)
  }

  /**
   * Scrolls the viewport to the given layout position.
   */
  set_viewport_position (vector /*: [number, number]*/, animate /*: boolean*/,step /*: ?StepObject*/) /*: Promise<null>*/ {
    let animateBool = util.convertToPythonBool(animate)
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_viewport_position((${vector[0]}, ${vector[1]}), ${animateBool})`, false, step)
  }

  /**
   * Returns the width and height of the viewport.
   */
  viewport_extent (step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].viewport_extent()`, false, step)
  }

  /**
   * Returns the width and height of the layout.
   */
  layout_extent (step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].layout_extent()`, false, step)
  }

  /**
   * Converts a text point to a layout position.
   */
  text_to_layout (point /*: number*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].text_to_layout(${point})`, false, step)
  }

  /**
   * Converts a text point to a window position.
   */
  text_to_window (point /*: number*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].text_to_window(${point})`, false, step)
  }

  /**
   * Converts a layout position to a text point.
   */
  layout_to_text (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].layout_to_text((${vector[0]}, ${vector[1]}))`, false, step)
  }

  /**
   * Converts a layout position to a window position.
   */
  layout_to_window (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].layout_to_window((${vector[0]}, ${vector[1]}))`, false, step)
  }

  /**
   * Converts a window position to a layout position.
   */
  window_to_layout (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].window_to_layout((${vector[0]}, ${vector[1]}))`, false, step)
  }

  /**
   * Converts a window position to a text point.
   */
  window_to_text (vector /*: [number, number]*/, step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].window_to_text((${vector[0]}, ${vector[1]}))`, false, step)
  }

  /**
   * Returns the light height used in the layout.
   */
  line_height (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].line_height()`, false, step)
  }

  /**
   * Returns the typical character width used in the layout.
   */
  em_width (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].em_width()`, false, step)
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
  add_regions (key /*: string*/, regions /*: Array<Region>*/, scope /*: ?string*/ = '', icon /*: ?string*/ = '', flags /*: ?number*/ = 0, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let regionsVariableArray = []
    for (let region of regions)
      regionsVariableArray.push(`${config.variableMappingName}["${region.self.mapTo}"]`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].add_regions(${key}, ${regionsArray}, """${scope}""", """${icon}""", ${flags})`, false, step)
  }

  /**
   * Return the regions associated with the given ```key```, if any.
   */
  get_regions (key /*: string*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get_regions("""${key}""")`, false, step, (result, resultObject) => {
      let regions = []
      for (let region of resultObject.value) {
        regions.push(new Region(region))
      }
      return regions
    } )
  }

  /**
   * Removed the named regions.
   */
  erase_regions (key /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].erase_regions("""${key}""")`, false, step)
  }

  /**
   * Adds the status ```key``` to the view. The ```value``` will be displayed in the status bar, in a comma separated list of all status ```values```, ordered by key. Setting the value to the empty string will clear the status.
   */
  set_status (key /*: string*/, value /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_status("""${key}""", """${value}""")`, false, step)
  }

  /**
   * Returns the previously assigned value associated with the ```key```, if any.
   */
  get_status (key /*: string*/, step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].get_status("""${key}""")`, false, step)
  }

  /**
   * Clears the named status.
   */
  erase_status (key /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].erase_status("""${key}""")`, false, step)
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
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].command_history(${index}, ${modifyingOnly})`, false, step)
  }

  /**
   * Returns the current change count. Each time the buffer is modified, the change count is incremented. The change count can be used to determine if the buffer has changed since the last it was inspected.
   */
  change_count (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].change_count()`, false, step)
  }

  /**
   * Folds the given ```regions```, returning ```false``` if they were already folded
   *
   * or
   *
   * Folds the given ```region```, returning ```false``` if it was already folded.
   */
  fold (regions /*: Region | Array<Region>*/, step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    let regionsVariableArray = []

    if (regions instanceof Region)
      regions = [regions]

    for (let region of regions)
      regionsVariableArray.push(`${config.variableMappingName}["${region.self.mapTo}"]`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].fold(${regionsArray})`, false, step)
  }

  /**
   * Unfolds all text in the ```regions```, returning the unfolded regions
   *
   * or
   *
   * Unfolds all text in the ```region```, returning the unfolded regions.
   */
  unfold (regions /*: Region | Array<Region>*/, step /*: ?StepObject*/) /*: Promise<Array<Region>>*/ {
    let regionsVariableArray = []

    if (regions instanceof Region)
      regions = [regions]

    for (let region of regions)
      regionsVariableArray.push(`${config.variableMappingName}["${region.self.mapTo}"]`)
    
    let regionsArray = '[' + regionsVariableArray.join(',') + ']'

    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].unfold(${regionsArray})`, false, step, (result, resultObject) => {
      let regions = []
      for (let region of resultObject.value) {
        regions.push(new Region(region))
      }
      return regions
    } )
  }

  /**
   * Returns the encoding currently associated with the file.
   */
  encoding (step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].encoding()`, false, step)
  }

  /**
   * Applies a new encoding to the file. This encoding will be used the next time the file is saved.
   */
  set_encoding (encoding /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_encoding("""${encoding}""")`, false, step)
  }

  /**
   * Returns the line endings used by the current file.
   */
  line_endings (step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].line_endings()`, false, step)
  }

  /**
   * Sets the line endings that will be applied when next saving.
   */
  set_line_endings (line_endings /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_line_endings("""${line_endings}""")`, false, step)
  }

  /**
   * Returns the overwrite status, which the user normally toggles via the insert key.
   */
  overwrite_status (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].overwrite_status()`, false, step)
  }

  /**
   * Returns the overwrite status, which the user normally toggles via the insert key.
   */
  overwrite_status (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].overwrite_status()`, false, step)
  }

  /**
   * Sets the overwrite status.
   */
  set_overwrite_status (enabled /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let enabledBool = util.convertToPythonBool(enabled)
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].set_overwrite_status(${enabledBool})`, false, step)
  }

  /**
   * Extract all the symbols defined in the buffer.
   */
  symbols (step /*: ?StepObject*/) /*: Promise<Array<[Region, string]>>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].symbols()`, false, step, (result, resultObject) => {
      let symbols = []
      for (let symbol of resultObject.value) {
        symbols.push([new Region(symbol[0]), symbol[1]])
      }
      return symbols
    } )
  }

  /**
   * Shows a pop up menu at the caret, to select an item in a list. ```on_done``` will be called once, with the index of the selected item. If the pop up menu was cancelled, ```on_done``` will be called with an argument of ```-1```.
   * 
   * ```items``` is a list of strings.
   * 
   * ```flags``` it currently unused.
   */
  show_popup_menu (items /*: Array<string>*/, on_done /*: (number, ?StepObject) => void*/, flags /*: ?number*/ = 0, step /*: ?StepObject*/) /*: void*/ {
    util.callbackPython(`${config.variableMappingName}["${this.self.mapTo}"].show_popup_menu(json.loads("""${JSON.stringify(items)}"""), lambda index: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, index)), ${flags})`, [on_done])
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
  show_popup (content /*: string*/, flags /*: ?number*/ = 0, location /*: ?number*/ = -1, max_width /*: ?number*/ = 320, max_height /*: ?number*/ = 240, on_navigate /*: ?(string, ?StepObject) => void*/, on_hide /*: ?(?StepObject) => void*/, step /*: ?StepObject*/) /*: void*/ {
    let callbacks = []
    let code = `${config.variableMappingName}["${this.self.mapTo}"].show_popup("""${content}""", ${flags}, ${location}, ${max_width}, ${max_height}`

    if (on_navigate != undefined) {
      code += `, lambda href: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, href))`
      callbacks.push(async (httpTempServers, href, subStep) => {
        await on_navigate(href, subStep)
      })
    }
    else
      code += ', None'

    code += `, lambda: sublime.set_timeout_async(lambda: callback($PORT_TOKEN))`
    callbacks.push(async (httpTempServers, subStep) => {

      if (on_hide != undefined)
        await on_hide(subStep)

      for (let httpTempServer of httpTempServers) 
        httpTempServer.close()
    })

    code += ')'

    util.callbackPython(code, callbacks)
  }

  /**
   * Updates the contents of the currently visible popup.
   */
  update_popup (content /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].update_popup("""${content}""")`, false, step)
  }

  /**
   * Returns if the popup is currently shown.
   */
  is_popup_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].is_popup_visible()`, false, step)
  }

  /**
   * Hides the popup.
   */
  hide_popup (step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].hide_popup()`, false, step)
  }

  /**
   * Returns if the auto complete menu is currently visible.
   */
  is_auto_complete_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].is_auto_complete_visible()`, false, step)
  }

  /**
   * Returns an ```object``` of the global style settings for the view. _All colors are normalized to the six character hex form with a leading hash, e.g. ```#ff0000```_.
   */
  style (step /*: ?StepObject*/) /*: Promise<Object>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].style()`, false, step)
  }

  /**
   * Accepts a string scope name and returns an ```object``` of style information, include the keys ```foreground```, ```bold```, ```italic```, ```source_line```, ```source_column``` and ```source_file```. If the scope has a background color set, the key ```background``` will be present. _The foreground and background colors are normalized to the six character hex form with a leading hash, e.g. ```#ff0000```_.
   */
  style_for_scope (scope_name /*: string*/, step /*: ?StepObject*/) /*: Promise<Object>*/ {
    return util.simpleEval(`${config.variableMappingName}["${this.self.mapTo}"].style_for_scope("""${scope_name}""")`, false, step)
  }

}

module.exports = View