// @flow

const jayson = require('jayson'),
      getPort = require('get-port'),
      util = require('./util.js'),
      PythonError = require('./PythonError.js'),
      Region = require('./Region.js'),
      View = require('./View.js')

class sublime {

  static set_timeout (callback /*: Function*/, delay /*: number*/) /*: void*/ {

    getPort().then(port => {

      let httpTempServer = null

      let tempServer = jayson.server({
        timeout: async (result, cbStep) => {
          let step = {
            cb: cbStep
          }

          try {
            await callback(httpTempServer, step)
          } catch(e) {
            console.log(e);
          }

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

  static set_timeout_async (callback /*: Function*/, delay /*: number*/) /*: void*/ {

    getPort().then(port => {

      let httpTempServer = null

      let tempServer = jayson.server({
        timeout: async (result, cbStep) => {
          let step = {
            cb: cbStep
          }

          try {
            await callback(httpTempServer, step)
          } catch(e) {
            console.log(e);
          }

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
      return util.simpleEval(`sublime.encode_value(variable_mapping["${mappedVar}"], ${util.convertToPythonBool(pretty)})`, false)
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
        codeString = `"${variable}": variable_mapping["${mappedVariable}"]`
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

  static async Region (a /*: number*/, b /*: number*/) /*: Promise<Region>*/ {
    return util.simpleEval(`sublime.Region(${parseInt(a)}, ${parseInt(b)})`, true, null, ((result, resultObject) => {
      return new Region(resultObject)
    }) )
  }

  static async View (id /*: number*/) /*: Promise<View>*/ {
    return util.simpleEval(`sublime.View(${parseInt(id)})`, true, null, ((result, resultObject) => {
      return new View(resultObject)
    }) )
  }

}

module.exports = sublime