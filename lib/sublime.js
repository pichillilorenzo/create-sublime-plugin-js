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
 */
class sublime {

  /*::
  static DIALOG_YES: number
  static DIALOG_NO: number
  static DIALOG_CANCEL: number
  static ENCODED_POSITION: number
  static TRANSIENT: number
  static CLASS_WORD_START: number
  static CLASS_WORD_END: number
  static CLASS_PUNCTUATION_START: number
  static CLASS_PUNCTUATION_END: number
  static CLASS_SUB_WORD_START: number
  static CLASS_SUB_WORD_END: number
  static CLASS_LINE_START: number
  static CLASS_LINE_END: number
  static CLASS_EMPTY_LINE: number
  static LITERAL: number
  static IGNORECASE: number
  */

  /**
   * 
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
   * 
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
   * 
   */
  static error_message (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('error_message', [string])
  }

  /**
   * 
   */
  static message_dialog (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('message_dialog', [string])
  }

  /**
   * 
   */
  static ok_cancel_dialog (string /*: string*/, ok_title /*: string*/ = "") /*: Promise<any>*/ {
    return util.simpleCommand('ok_cancel_dialog', [string, ok_title])
  }

  /**
   * 
   */
  static yes_no_cancel_dialog (string /*: string*/, yes_title /*: string*/ = "", no_title /*: string*/ = "") /*: Promise<any>*/ {
    return util.simpleCommand('yes_no_cancel_dialog', [string, yes_title, no_title])
  }

  /**
   * 
   */
  static load_resource (name /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('load_resource', [name])
  }

  /**
   * 
   */
  static load_binary_resource (name /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand( 'load_binary_resource', [name], (result => {return Buffer.from(result)}) )
  }

  /**
   * 
   */
  static find_resources (pattern /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('find_resources', [pattern])
  }

  /**
   * 
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
   * 
   */
  static decode_value (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('decode_value', [string])
  }

  /**
   * 
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
   * 
   */
  static load_settings (basename /*: string*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`sublime.load_settings("""${basename}""")`, true, null, (result, resultObject) => {
      return new Settings(resultObject)
    } )
  }

  /**
   * 
   */
  static save_settings (base_name /*: string*/) /*: Promise<null>*/ {
    return util.simpleCommand('save_settings', [base_name])
  }

  /**
   * 
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
   * 
   */
  static active_window () /*: Promise<Window>*/ {
    return util.simpleEval(`sublime.active_window()`, true, null, (result, resultObject) => {
      return new Window(resultObject)
    } )
  }

  /**
   * 
   */
  static packages_path () /*: Promise<string>*/ {
    return util.simpleCommand('packages_path', [])
  }

  /**
   * 
   */
  static installed_packages_path () /*: Promise<string>*/ {
    return util.simpleCommand('installed_packages_path', [])
  }

  /**
   * 
   */
  static cache_path () /*: Promise<string>*/ {
    return util.simpleCommand('cache_path', [])
  }

  /**
   * 
   */
  static get_clipboard (size_limit /*: ?number*/ = 16777216) /*: Promise<string>*/ {
    return util.simpleCommand('get_clipboard', [size_limit])
  }

  /**
   * 
   */
  static set_clipboard (string /*: string*/) /*: Promise<null>*/ {
    return util.simpleCommand('set_clipboard', [string])
  }

  /**
   * 
   */
  static score_selector (scope /*: string*/, selector /*: string*/) /*: Promise<number>*/ {
    return util.simpleCommand('score_selector', [scope, selector])
  }

  /**
   * 
   */
  static run_command (string /*: string*/, args /*: ?Object*/) /*: Promise<null>*/ {
    return util.simpleCommand('run_command', [string, args])
  }

  /**
   * 
   */
  static log_commands (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_commands', [flag])
  }

  /**
   * 
   */
  static log_input (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_input', [flag])
  }

  /**
   * 
   */
  static log_result_regex (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_result_regex', [flag])
  }

  /**
   * 
   */
  static version () /*: Promise<string>*/ {
    return util.simpleCommand('version', [])
  }

  /**
   * 
   */
  static platform () /*: Promise<string>*/ {
    return util.simpleCommand('platform', [])
  }

  /**
   * 
   */
  static arch () /*: Promise<string>*/ {
    return util.simpleCommand('arch', [])
  }

  /**
   * 
   */
  static Region (a /*: number*/, b /*: number*/) /*: Promise<Region>*/ {
    return util.simpleEval(`sublime.Region(${a}, ${b})`, true, null, (result, resultObject) => {
      return new Region(resultObject)
    } )
  }

  /**
   * 
   */
  static Window (id /*: number*/) /*: Promise<Window>*/ {
    return util.simpleEval(`sublime.Window(${id})`, true, null, (result, resultObject) => {
      return new Window(resultObject)
    } )
  }

  /**
   * 
   */
  static View (id /*: number*/) /*: Promise<View>*/ {
    return util.simpleEval(`sublime.View(${id})`, true, null, (result, resultObject) => {
      return new View(resultObject)
    } )
  }

  /**
   * 
   */
  static Settings (id /*: number*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`sublime.Settings(${id})`, true, null, (result, resultObject) => {
      return new Settings(resultObject)
    } )
  }

  /**
   * 
   */
  static Sheet (id /*: number*/) /*: Promise<Sheet>*/ {
    return util.simpleEval(`sublime.Sheet(${id})`, true, null, (result, resultObject) => {
      return new Sheet(resultObject)
    } )
  }

  /**
   * 
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
sublime.DIALOG_CANCEL = 0
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
sublime.LITERAL = 1
/**
 * 
 * @type {Number}
 */
sublime.IGNORECASE = 2

module.exports = sublime