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
      Sheet = require('./Sheet.js')

class sublime {

  /*::
  static ENCODED_POSITION: string
  static TRANSIENT: string
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

      util.sendCommand('set_timeout', [parseInt(port), parseInt(delay)], (result, resolve, reject) => {
        let err = (result.error) ? new PythonError(result.error) : null
        if (err) 
          console.log(err)
      })
    })

  }

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

      util.sendCommand('set_timeout_async', [parseInt(port), parseInt(delay)], (result, resolve, reject) => {
        let err = (result.error) ? new PythonError(result.error) : null
        if (err) 
          console.log(err)
      })
    })

  }

  static error_message (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('error_message', [string])
  }

  static message_dialog (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('message_dialog', [string])
  }

  static ok_cancel_dialog (string /*: string*/, ok_title /*: string*/ = "") /*: Promise<any>*/ {
    return util.simpleCommand('ok_cancel_dialog', [string, ok_title])
  }

  static yes_no_cancel_dialog (string /*: string*/, yes_title /*: string*/ = "", no_title /*: string*/ = "") /*: Promise<any>*/ {
    return util.simpleCommand('yes_no_cancel_dialog', [string, yes_title, no_title])
  }

  static load_resource (name /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('load_resource', [name])
  }

  static load_binary_resource (name /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand( 'load_binary_resource', [name], (result => {return Buffer.from(result)}) )
  }

  static find_resources (pattern /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('find_resources', [pattern])
  }

  static encode_value (value /*: any*/, pretty /*: boolean*/ = false) /*: Promise<any>*/ {
    let mappedVar = util.getMapToVariableName(value)
    if (mappedVar) {
      return util.simpleEval(`sublime.encode_value(${config.variable_mapping_name}["${mappedVar}"], ${util.convertToPythonBool(pretty)})`, false)
    }
    else {
      return util.simpleCommand('encode_value', [value, pretty])
    }
  }

  static decode_value (string /*: string*/) /*: Promise<any>*/ {
    return util.simpleCommand('decode_value', [string])
  }

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
        codeString = `"${variable}": ${config.variable_mapping_name}["${mappedVariable}"]`
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

  static load_settings (basename /*: string*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`sublime.load_settings("""${basename}""")`, true, null, (result, resultObject) => {
      return new Settings(resultObject)
    } )
  }

  static save_settings (base_name /*: string*/) /*: Promise<null>*/ {
    return util.simpleCommand('save_settings', [base_name])
  }

  static windows () /*: Promise<Array<Window>>*/ {
    return util.simpleEval(`sublime.windows()`, false, null, (result, resultObject) => {
      let windows = []
      for (let w of resultObject.value) {
        windows.push(new Window(w))
      }
      return windows
    } )
  }

  static active_window () /*: Promise<Window>*/ {
    return util.simpleEval(`sublime.active_window()`, true, null, (result, resultObject) => {
      return new Window(resultObject)
    } )
  }

  static packages_path () /*: Promise<string>*/ {
    return util.simpleCommand('packages_path', [])
  }

  static installed_packages_path () /*: Promise<string>*/ {
    return util.simpleCommand('installed_packages_path', [])
  }

  static cache_path () /*: Promise<string>*/ {
    return util.simpleCommand('cache_path', [])
  }

  static get_clipboard (size_limit /*: ?number*/ = 16777216) /*: Promise<string>*/ {
    return util.simpleCommand('get_clipboard', [size_limit])
  }

  static set_clipboard (string /*: string*/) /*: Promise<null>*/ {
    return util.simpleCommand('set_clipboard', [string])
  }

  static score_selector (scope /*: string*/, selector /*: string*/) /*: Promise<number>*/ {
    return util.simpleCommand('score_selector', [scope, selector])
  }

  static run_command (string /*: string*/, args /*: ?Object*/) /*: Promise<null>*/ {
    return util.simpleCommand('run_command', [string, args])
  }

  static log_commands (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_commands', [flag])
  }

  static log_input (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_input', [flag])
  }

  static log_result_regex (flag /*: boolean*/) /*: Promise<null>*/ {
    return util.simpleCommand('log_result_regex', [flag])
  }

  static version () /*: Promise<string>*/ {
    return util.simpleCommand('version', [])
  }

  static platform () /*: Promise<string>*/ {
    return util.simpleCommand('platform', [])
  }

  static arch () /*: Promise<string>*/ {
    return util.simpleCommand('arch', [])
  }

  static Region (a /*: number*/, b /*: number*/) /*: Promise<Region>*/ {
    return util.simpleEval(`sublime.Region(${parseInt(a)}, ${parseInt(b)})`, true, null, (result, resultObject) => {
      return new Region(resultObject)
    } )
  }

  static Window (id /*: number*/) /*: Promise<Window>*/ {
    return util.simpleEval(`sublime.Window(${parseInt(id)})`, true, null, (result, resultObject) => {
      return new Window(resultObject)
    } )
  }

  static View (id /*: number*/) /*: Promise<View>*/ {
    return util.simpleEval(`sublime.View(${parseInt(id)})`, true, null, (result, resultObject) => {
      return new View(resultObject)
    } )
  }

  static Settings (id /*: number*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`sublime.Settings(${parseInt(id)})`, true, null, (result, resultObject) => {
      return new Settings(resultObject)
    } )
  }

  static Sheet (id /*: number*/) /*: Promise<Sheet>*/ {
    return util.simpleEval(`sublime.Sheet(${parseInt(id)})`, true, null, (result, resultObject) => {
      return new Sheet(resultObject)
    } )
  }

}

sublime.ENCODED_POSITION = "sublime.ENCODED_POSITION"
sublime.TRANSIENT = "sublime.TRANSIENT"

module.exports = sublime