// @flow

const jayson = require('jayson'),
      client = jayson.client.http('http://localhost:9200'),
      getPort = require('get-port'),
      util = require('./util.js'),
      Region = require('./region.js')

class sublime {

  static set_timeout (callback, delay) {

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

  static set_timeout_async (callback, delay) {

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

  static error_message (string) {
    return util.sendCommand('message_dialog', [string], (result, resolve) => {
      resolve(result)
    })
  }

  static message_dialog (string) {
    return util.sendCommand('message_dialog', [string], (result, resolve) => {
      resolve(result)
    })
  }

  static ok_cancel_dialog (string, ok_title="") {
    return util.sendCommand('ok_cancel_dialog', [string, ok_title], (result, resolve) => {
      resolve(result)
    })
  }

  static yes_no_cancel_dialog (string, yes_title="", no_title="") {
    return util.sendCommand('yes_no_cancel_dialog', [string, yes_title, no_title], (result, resolve) => {
      resolve(result)
    })
  }

  static load_resource (name) {
    return util.sendCommand('load_resource', [name], (result, resolve) => {
      resolve(result)
    })
  }

  static load_binary_resource (name) {
    return util.sendCommand('load_binary_resource', [name], (result, resolve) => {
      resolve(Buffer.from(result))
    })
  }

  static async Region (a, b) {
    let code = `sublime.Region(${parseInt(a)}, ${parseInt(b)})`
    return util.sendCommand('evalCode', [code, true], (result, resolve) => {
      resolve(new Region(result))
    })
  }

}

module.exports = sublime