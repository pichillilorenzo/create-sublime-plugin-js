// @flow

const jayson = require('jayson'),
      client = jayson.client.http('http://localhost:9200'),
      getPort = require('get-port'),
      util = require('./util.js'),
      Region = require('./region.js')

class sublime {

  static set_timeout (callback /*: Function*/, delay /*: number*/) {

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

      util.sendCommand('set_timeout', [parseInt(port), parseInt(delay)])
    })

  }

  static set_timeout_async (callback /*: Function*/, delay /*: number*/) {

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

      util.sendCommand('set_timeout_async', [parseInt(port), parseInt(delay)])
    })

  }

  static error_message (string /*: string*/) {
    return util.sendCommand('message_dialog', [string], (result, resolve) => {
      resolve(result)
    })
  }

  static message_dialog (string /*: string*/) {
    return util.sendCommand('message_dialog', [string], (result, resolve) => {
      resolve(result)
    })
  }

  static ok_cancel_dialog (string /*: string*/, ok_title /*: string*/ = "") {
    return util.sendCommand('ok_cancel_dialog', [string, ok_title], (result, resolve) => {
      resolve(result)
    })
  }

  static yes_no_cancel_dialog (string /*: string*/, yes_title /*: string*/ = "", no_title /*: string*/ = "") {
    return util.sendCommand('yes_no_cancel_dialog', [string, yes_title, no_title], (result, resolve) => {
      resolve(result)
    })
  }

  static load_resource (name /*: string*/) {
    return util.sendCommand('load_resource', [name], (result, resolve) => {
      resolve(result)
    })
  }

  static load_binary_resource (name /*: string*/) {
    return util.sendCommand('load_binary_resource', [name], (result, resolve) => {
      resolve(Buffer.from(result))
    })
  }

  static find_resources (pattern /*: string*/) {
    return util.sendCommand('find_resources', [pattern], (result, resolve) => {
      resolve(result)
    })
  }

  static encode_value (value /*: any*/, pretty /*: boolean*/ = false) {
    let mappedVar = util.getMapToVariableName(value)
    if (mappedVar) {
      return util.sendCommand('evalCode', [`sublime.encode_value(variable_mapping["${mappedVar}"], ${util.convertToPythonBool(pretty)})`, false], (result, resolve) => {
        resolve(result)
      })
    }
    else {
      return util.sendCommand('encode_value', [value, pretty], (result, resolve) => {
        resolve(result)
      })
    }
  }

  static decode_value (string /*: string*/) {
    return util.sendCommand('decode_value', [string], (result, resolve) => {
      resolve(result)
    })
  }

  static expand_variables (value /*: string | Array<any> | Object*/, variables /*: Object*/) {
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
      return util.sendCommand('evalCode', [`sublime.expand_variables(${ (typeof value == "string") ? '"""' + value + '"""' : 'json.dumps("""' + JSON.stringify(value) + '""", ensure_ascii=False)'}, ${variablesParam})`, false], (result, resolve) => {
        resolve(result)
      })
    }
    else {
      return util.sendCommand('expand_variables', [value, variables], (result, resolve) => {
        resolve(result)
      })
    }  
  }

  static async Region (a /*: number*/, b /*: number*/) {
    let code = `sublime.Region(${parseInt(a)}, ${parseInt(b)})`
    return util.sendCommand('evalCode', [code, true], (result, resolve) => {
      resolve(new Region(result))
    })
  }

}

module.exports = sublime