// @flow

const jayson = require('jayson'),
      getPort = require('get-port'),
      util = require('./util.js'),
      config = require('./config.js'),
      PythonError = require('./PythonError.js'),
      Region = require('./Region.js'),
      Window = require('./Window.js'),
      View = require('./View.js'),
      Settings = require('./Settings.js'),
      Sheet = require('./Sheet.js'),
      Selection = require('./Selection.js')

/**
 * Represents the [sublime Module](https://www.sublimetext.com/docs/3/api_reference.html#sublime).
 *
 * ## PLUGIN LIFECYCLE
 * At importing time, plugins may not call any API functions, with the exception of ```sublime.version()```, ```sublime.platform()```, ```sublime.architecture()``` and ```sublime.channel()```.
 * 
 * If a plugin defines a module level function ```plugin_loaded()```, this will be called when the API is ready to use. Plugins may also define ```plugin_unloaded()```, to get notified just before the plugin is unloaded.
 * 
 * ## THREADING
 * All API functions are thread-safe, however keep in mind that from the perspective of code running in an alternate thread, application state will be changing while the code is running.
 * 
 * ## UNITS AND COORDINATES
 * API functions that accept or return coordinates or dimensions do so using device-independent pixel (dip) values. While in some cases these will be equivalent to device pixels, this is often not the case. Per the CSS specification, [minihtml](https://www.sublimetext.com/docs/3/minihtml.html) treats the ```px``` unit as device-independent.
 * 
 * ## TYPES
 * This documentation generally refers to simply Python data types. Some type names are classes documented herein, however there are also a few custom type names that refer to construct with specific semantics:
 * 
 * - ```location```: an array of ```[str, str, [int, int]]``` that contains information about a location of a symbol. The first string is the absolute file path, the second is the file path relative to the project, the third element is a two-element tuple of the row and column.
 * - ```point```: an int that represents the offset from the beginning of the editor buffer. The ```View``` methods ```text_point()``` and ```rowcol()``` allow converting to and from this format.
 * - ```value```: any of the JavaScript data types ```String```, ```Number```, ```Boolean```, ```Object```, ```Array```.
 * - ```dip```: a ```float``` that represents a device-independent pixel.
 * - ```vector```: a tuple of ```(dip, dip)``` representing ```x``` and ```y``` coordinates.
 * - ```CommandInputHandler```: a subclass of either {@link TextInputHandler} or {@link ListInputHandler}.
 */
class sublime {

  /*::
  static HOVER_TEXT: number
  static HOVER_GUTTER: number
  static HOVER_MARGIN: number
  static ENCODED_POSITION: number
  static TRANSIENT: number
  static FORCE_GROUP: number
  static IGNORECASE: number
  static LITERAL: number
  static MONOSPACE_FONT: number
  static KEEP_OPEN_ON_FOCUS_LOST: number
  static HTML: number
  static COOPERATE_WITH_AUTO_COMPLETE: number
  static HIDE_ON_MOUSE_MOVE: number
  static HIDE_ON_MOUSE_MOVE_AWAY: number
  static DRAW_EMPTY: number
  static HIDE_ON_MINIMAP: number
  static DRAW_EMPTY_AS_OVERWRITE: number
  static PERSISTENT: number
  static DRAW_OUTLINED: number
  static DRAW_NO_FILL: number
  static DRAW_NO_OUTLINE: number
  static DRAW_SOLID_UNDERLINE: number
  static DRAW_STIPPLED_UNDERLINE: number
  static DRAW_SQUIGGLY_UNDERLINE: number
  static HIDDEN: number
  static OP_EQUAL: number
  static OP_NOT_EQUAL: number
  static OP_REGEX_MATCH: number
  static OP_NOT_REGEX_MATCH: number
  static OP_REGEX_CONTAINS: number
  static OP_NOT_REGEX_CONTAINS: number
  static CLASS_WORD_START: number
  static CLASS_WORD_END: number
  static CLASS_PUNCTUATION_START: number
  static CLASS_PUNCTUATION_END: number
  static CLASS_SUB_WORD_START: number
  static CLASS_SUB_WORD_END: number
  static CLASS_LINE_START: number
  static CLASS_LINE_END: number
  static CLASS_EMPTY_LINE: number
  static INHIBIT_WORD_COMPLETIONS: number
  static INHIBIT_EXPLICIT_COMPLETIONS: number
  static DIALOG_CANCEL: number
  static DIALOG_YES: number
  static DIALOG_NO: number
  static UI_ELEMENT_SIDE_BAR: number
  static UI_ELEMENT_MINIMAP: number
  static UI_ELEMENT_TABS: number
  static UI_ELEMENT_STATUS_BAR: number
  static UI_ELEMENT_MENU: number
  static UI_ELEMENT_OPEN_FILES: number
  static LAYOUT_INLINE: number
  static LAYOUT_BELOW: number
  static LAYOUT_BLOCK: number
  */

  /**
   * Runs the ```callback``` in the main thread after the given ```delay``` (in milliseconds). Callbacks with an equal delay will be run in the order they were added.
   */
  static set_timeout (callback /*: (?StepObject) => Promise<any>*/, delay /*: number*/) /*: void*/ {

    getPort().then(port => {

      let httpTempServer = null

      let tempServer = jayson.server({
        callback: async (result, cbStep) => {
          let step = {
            cb: cbStep
          }

          try {
            await callback(step)
          } catch(e) {
            console.log(e);
          }

          httpTempServer.close()
          step.cb(null, {
            'end_cb_step': 'END'
          })
        }
      })

      httpTempServer = tempServer.http()
      httpTempServer.listen(port);

      util.sendCommand('set_timeout', [port, delay], (result, resolve, reject) => {
        let err = (result.error) ? new PythonError(result.error) : null
        if (err) 
          console.log(err)
      })
    })

  }

  /**
   * Runs the ```callback``` on an alternate thread after the given ```delay``` (in milliseconds).
   */
  static set_timeout_async (callback /*: (?StepObject) => Promise<any>*/, delay /*: number*/) /*: void*/ {

    getPort().then(port => {

      let httpTempServer = null

      let tempServer = jayson.server({
        callback: async (result, cbStep) => {
          let step = {
            cb: cbStep
          }

          try {
            await callback(step)
          } catch(e) {
            console.log(e);
          }

          httpTempServer.close()
          step.cb(null, {
            'end_cb_step': 'END'
          })
        }
      })

      httpTempServer = tempServer.http()
      httpTempServer.listen(port);

      util.sendCommand('set_timeout_async', [port, delay], (result, resolve, reject) => {
        let err = (result.error) ? new PythonError(result.error) : null
        if (err) 
          console.log(err)
      })
    })

  }

  /**
   * Displays an error dialog to the user.
   */
  static error_message (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('error_message', [string])
  }

  /**
   * Displays a message dialog to the user.
   */
  static message_dialog (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('message_dialog', [string])
  }

  /**
   * Displays an ok / cancel question dialog to the user. If ```ok_title``` is provided, this may be used as the text on the ok button. Returns ```true``` if the user presses the ok button.
   */
  static ok_cancel_dialog (string /*: string*/, ok_title /*: string*/ = "") /*: Promise<any>*/ {
    return util.simpleCommand('ok_cancel_dialog', [string, ok_title])
  }

  /**
   * Displays a yes / no / cancel question dialog to the user. If ```yes_title``` and/or ```no_title``` are provided, they will be used as the text on the corresponding buttons on some platforms. Returns ```sublime.DIALOG_YES```, ```sublime.DIALOG_NO``` or ```sublime.DIALOG_CANCEL```.
   */
  static yes_no_cancel_dialog (string /*: string*/, yes_title /*: string*/ = "", no_title /*: string*/ = "") /*: Promise<any>*/ {
    return util.simpleCommand('yes_no_cancel_dialog', [string, yes_title, no_title])
  }

  /**
   * Loads the given resource. The ```name``` should be in the format ```Packages/Default/Main.sublime-menu```.
   */
  static load_resource (name /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('load_resource', [name])
  }

  /**
   * Loads the given resource. The ```name``` should be in the format ```Packages/Default/Main.sublime-menu```.
   */
  static load_binary_resource (name /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand( 'load_binary_resource', [name], (result => {return Buffer.from(result)}) )
  }

  /**
   * Finds resources whose file name matches the given ```pattern```.
   */
  static find_resources (pattern /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('find_resources', [pattern])
  }

  /**
   * Encode a JSON compatible ```value``` into a string representation. If ```pretty``` is set to ```true```, the string will include newlines and indentation.
   */
  static encode_value (value /*: any*/, pretty /*: boolean*/ = false) /*: Promise<any>*/ {
    let mappedVar = util.getMapToVariableName(value)
    if (mappedVar) {
      return util.simpleEval(`sublime.encode_value(${config.variableMappingName}["${mappedVar}"], ${util.convertToPythonBool(pretty)})`, false)
    }
    else {
      return util.simpleCommand('encode_value', [value, pretty])
    }
  }

  /**
   * Decodes a JSON string into an object. If the ```string``` is invalid, a ```ValueError``` will be thrown.
   */
  static decode_value (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('decode_value', [string])
  }

  /**
   * Expands any variables in the string ```value``` using the variables defined in the dictionary ```variables```. ```value``` may also be a ```list``` or ```object```, in which case the structure will be recursively expanded. Strings should use snippet syntax, for example: ```expand_variables("Hello, ${name}", {"name": "Foo"})```
   */
  static expand_variables (value /*: string | Array<any> | Object*/, variables /*: Object*/) /*: Promise<any>*/ {
    let variablesParam = []
    let foundMappedVar = false

    for (let variable in variables) {
      let codeString = ''
      let mappedVariable = util.getMapToVariableName(variables[variable])

      if (!mappedVariable)
        codeString = `"${variable}": ${JSON.stringify(variables[variable])}`
      else {
        if (!foundMappedVar)
          foundMappedVar = true
        codeString = `"${variable}": ${config.variableMappingName}["${mappedVariable}"]`
      }

      variablesParam.push(codeString)
    }

    variablesParam = "{" + variablesParam.join(",") + "}"

    if (foundMappedVar) {
      return util.simpleEval(`sublime.expand_variables(${ (typeof value == "string") ? '"""' + value + '"""' : 'json.dumps("""' + JSON.stringify(value) + '""", ensure_ascii=False)'}, ${variablesParam})`, false)
    }
    else {
      return util.simpleCommand('expand_variables', [value, variables])
    }  
  }

  /**
   * Loads the named settings. The name should include a file name and extension, but not a path. The packages will be searched for files matching the ```base_name```, and the results will be collated into the settings object. Subsequent calls to ```load_settings()``` with the ```base_name``` will return the same object, and not load the settings from disk again.
   */
  static load_settings (basename /*: string*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`sublime.load_settings("""${basename}""")`, true, null, (result, resultObject) => {
      return new Settings(resultObject)
    } )
  }

  /**
   * Flushes any in-memory changes to the named settings object to disk.
   */
  static save_settings (base_name /*: string*/) /*: Promise<null>*/ {
    return util.simpleCommand('save_settings', [base_name])
  }

  /**
   *  Returns a list of all the open windows.
   */
  static windows () /*: Promise<Array<Window>>*/ {
    return util.simpleEval(`sublime.windows()`, false, null, (result, resultObject) => {
      let windows = []
      for (let w of resultObject.value) {
        windows.push(new Window(w))
      }
      return windows
    } )
  }

  /**
   * Returns the most recently used window.
   */
  static active_window () /*: Promise<Window>*/ {
    return util.simpleEval(`sublime.active_window()`, true, null, (result, resultObject) => {
      return new Window(resultObject)
    } )
  }

  /**
   * Returns the path where all the user's loose packages are located.
   */
  static packages_path () /*: Promise<string>*/ {
    return util.simpleCommand('packages_path', [])
  }

  /**
   * Returns the path where all the user's ```.sublime-package``` files are located.
   */
  static installed_packages_path () /*: Promise<string>*/ {
    return util.simpleCommand('installed_packages_path', [])
  }

  /**
   * Returns the path where Sublime Text stores cache files.
   */
  static cache_path () /*: Promise<string>*/ {
    return util.simpleCommand('cache_path', [])
  }

  /**
   * Returns the contents of the clipboard. ```size_limit``` is there to protect against unnecessarily large data, defaults to 16,777,216 characters.
   */
  static get_clipboard (size_limit /*: ?number*/ = 16777216) /*: Promise<string>*/ {
    return util.simpleCommand('get_clipboard', [size_limit])
  }

  /**
   * Sets the contents of the clipboard.
   */
  static set_clipboard (string /*: string*/) /*: Promise<null>*/ {
    return util.simpleCommand('set_clipboard', [string])
  }

  /**
   * Matches the ```selector``` against the given ```scope```, returning a score. A score of ```0``` means no match, above ```0``` means a match. Different selectors may be compared against the same scope: a higher score means the selector is a better match for the scope.
   */
  static score_selector (scope /*: string*/, selector /*: string*/) /*: Promise<number>*/ {
    return util.simpleCommand('score_selector', [scope, selector])
  }

  /**
   * Runs the named {@link ApplicationCommand} with the (optional) given ```args```.
   */
  static run_command (string /*: string*/, args /*: ?Object*/) /*: Promise<null>*/ {
    return util.simpleCommand('run_command', [string, args])
  }

  /**
   * Returns a list of the commands and args that compromise the currently recorded macro. Each ```object``` will contain the keys ```command``` and ```args```.
   */
  static get_macro () /*: Promise<Array<Object>>*/ {
    return util.simpleCommand('get_macro', [])
  }

  /**
   * Controls command logging. If enabled, all commands run from key bindings and the menu will be logged to the console.
   */
  static log_commands (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_commands', [flag])
  }

  /**
   * Controls input logging. If enabled, all key presses will be logged to the console.
   */
  static log_input (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_input', [flag])
  }

  /**
   * Controls result regex logging. This is useful for debugging regular expressions used in build systems.
   */
  static log_result_regex (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_result_regex', [flag])
  }

  /**
   * Returns the version number
   */
  static version () /*: Promise<string>*/ {
    return util.simpleCommand('version', [])
  }

  /**
   * Returns the platform, which may be ```"osx"```, ```"linux"``` or ```"windows"```
   */
  static platform () /*: Promise<string>*/ {
    return util.simpleCommand('platform', [])
  }

  /**
   * Returns the CPU architecture, which may be ```"x32"``` or ```"x64"```
   */
  static arch () /*: Promise<string>*/ {
    return util.simpleCommand('arch', [])
  }

  /**
   * Creates a {@link Region} with initial values a and b.
   */
  static Region (a /*: number*/, b /*: number*/) /*: Promise<Region>*/ {
    return util.simpleEval(`sublime.Region(${a}, ${b})`, true, null, (result, resultObject) => {
      return new Region(resultObject)
    } )
  }

  /**
   * {@link Window}
   */
  static Window (id /*: number*/) /*: Promise<Window>*/ {
    return util.simpleEval(`sublime.Window(${id})`, true, null, (result, resultObject) => {
      return new Window(resultObject)
    } )
  }

  /**
   * {@link View}
   */
  static View (id /*: number*/) /*: Promise<View>*/ {
    return util.simpleEval(`sublime.View(${id})`, true, null, (result, resultObject) => {
      return new View(resultObject)
    } )
  }

  /**
   * {@link Settings}
   */
  static Settings (id /*: number*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`sublime.Settings(${id})`, true, null, (result, resultObject) => {
      return new Settings(resultObject)
    } )
  }

  /**
   * {@link Sheet}
   */
  static Sheet (id /*: number*/) /*: Promise<Sheet>*/ {
    return util.simpleEval(`sublime.Sheet(${id})`, true, null, (result, resultObject) => {
      return new Sheet(resultObject)
    } )
  }

  /**
   * {@link Selection}
   */
  static Selection (id /*: number*/) /*: Promise<Selection>*/ {
    return util.simpleEval(`sublime.Selection(${id})`, true, null, (result, resultObject) => {
      return new Selection(resultObject)
    } )
  }
}

/**
 *
 * @type {Number}
 */
sublime.HOVER_TEXT = 1
/**
 *
 * @type {Number}
 */
sublime.HOVER_GUTTER = 2
/**
 *
 * @type {Number}
 */
sublime.HOVER_MARGIN = 3
/**
 * Indicates the file_name should be searched for a ```:row``` or ```:row:col``` suffix.
 * @type {Number}
 */
sublime.ENCODED_POSITION = 1
/**
 * Open the file as a preview only: it won't have a tab assigned it until modified
 * @type {Number}
 */
sublime.TRANSIENT = 4
/**
 * Don't select the file if it's opened in a different group
 * @type {Number}
 */
sublime.FORCE_GROUP = 8
/**
 *
 * @type {Number}
 */
sublime.IGNORECASE = 2
/**
 *
 * @type {Number}
 */
sublime.LITERAL = 1
/**
 *
 * @type {Number}
 */
sublime.MONOSPACE_FONT = 1
/**
 *
 * @type {Number}
 */
sublime.KEEP_OPEN_ON_FOCUS_LOST = 2
/**
 *
 * @type {Number}
 */
sublime.HTML = 1
/**
 * Causes the popup to display next to the auto complete menu.
 * @type {Number}
 */
sublime.COOPERATE_WITH_AUTO_COMPLETE = 2
/**
 * Causes the popup to hide when the mouse is moved, clicked or scrolled.
 * @type {Number}
 */
sublime.HIDE_ON_MOUSE_MOVE = 4
/**
 * Causes the popup to hide when the mouse is moved (unless towards the popup), or when clicked or scrolled.
 * @type {Number}
 */
sublime.HIDE_ON_MOUSE_MOVE_AWAY = 8
/**
 * Draw empty regions with a vertical bar. By default, they aren't drawn at all.
 * @type {Number}
 */
sublime.DRAW_EMPTY = 1
/**
 * Don't show the regions on the minimap.
 * @type {Number}
 */
sublime.HIDE_ON_MINIMAP = 2
/**
 * Draw empty regions with a horizontal bar instead of a vertical one.
 * @type {Number}
 */
sublime.DRAW_EMPTY_AS_OVERWRITE = 4
/**
 * Save the regions in the session.
 * @type {Number}
 */
sublime.PERSISTENT = 16
/**
 * Deprecated, use [```DRAW_NO_FILL```](#sublimedraw_no_fill) instead.
 * @type {Number}
 */
sublime.DRAW_OUTLINED = 32
/**
 * Disable filling the regions, leaving only the outline.
 * @type {Number}
 */
sublime.DRAW_NO_FILL = 32
/**
 * Disable drawing the outline of the regions.
 * @type {Number}
 */
sublime.DRAW_NO_OUTLINE = 256
/**
 * Draw a solid underline below the regions.
 * @type {Number}
 */
sublime.DRAW_SOLID_UNDERLINE = 512
/**
 * Draw a stippled underline below the regions.
 * @type {Number}
 */
sublime.DRAW_STIPPLED_UNDERLINE = 1024
/**
 * Draw a squiggly underline below the regions.
 * @type {Number}
 */
sublime.DRAW_SQUIGGLY_UNDERLINE = 2048
/**
 * Don't draw the regions.
 * @type {Number}
 */
sublime.HIDDEN = 128
/**
 *
 * @type {Number}
 */
sublime.OP_EQUAL = 0
/**
 *
 * @type {Number}
 */
sublime.OP_NOT_EQUAL = 1
/**
 *
 * @type {Number}
 */
sublime.OP_REGEX_MATCH = 2
/**
 *
 * @type {Number}
 */
sublime.OP_NOT_REGEX_MATCH = 3
/**
 *
 * @type {Number}
 */
sublime.OP_REGEX_CONTAINS = 4
/**
 *
 * @type {Number}
 */
sublime.OP_NOT_REGEX_CONTAINS = 5
/**
 *
 * @type {Number}
 */
sublime.CLASS_WORD_START = 1
/**
 *
 * @type {Number}
 */
sublime.CLASS_WORD_END = 2
/**
 *
 * @type {Number}
 */
sublime.CLASS_PUNCTUATION_START = 4
/**
 *
 * @type {Number}
 */
sublime.CLASS_PUNCTUATION_END = 8
/**
 *
 * @type {Number}
 */
sublime.CLASS_SUB_WORD_START = 16
/**
 *
 * @type {Number}
 */
sublime.CLASS_SUB_WORD_END = 32
/**
 *
 * @type {Number}
 */
sublime.CLASS_LINE_START = 64
/**
 *
 * @type {Number}
 */
sublime.CLASS_LINE_END = 128
/**
 *
 * @type {Number}
 */
sublime.CLASS_EMPTY_LINE = 256
/**
 *
 * @type {Number}
 */
sublime.INHIBIT_WORD_COMPLETIONS = 8
/**
 *
 * @type {Number}
 */
sublime.INHIBIT_EXPLICIT_COMPLETIONS = 16
/**
 *
 * @type {Number}
 */
sublime.DIALOG_CANCEL = 0
/**
 *
 * @type {Number}
 */
sublime.DIALOG_YES = 1
/**
 *
 * @type {Number}
 */
sublime.DIALOG_NO = 2
/**
 *
 * @type {Number}
 */
sublime.UI_ELEMENT_SIDE_BAR = 1
/**
 *
 * @type {Number}
 */
sublime.UI_ELEMENT_MINIMAP = 2
/**
 *
 * @type {Number}
 */
sublime.UI_ELEMENT_TABS = 4
/**
 *
 * @type {Number}
 */
sublime.UI_ELEMENT_STATUS_BAR = 8
/**
 *
 * @type {Number}
 */
sublime.UI_ELEMENT_MENU = 16
/**
 *
 * @type {Number}
 */
sublime.UI_ELEMENT_OPEN_FILES = 32
/**
 *
 * @type {Number}
 */
sublime.LAYOUT_INLINE = 0
/**
 *
 * @type {Number}
 */
sublime.LAYOUT_BELOW = 1
/**
 *
 * @type {Number}
 */
sublime.LAYOUT_BLOCK = 2

module.exports = sublime