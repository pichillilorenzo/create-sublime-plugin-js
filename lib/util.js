// @flow

const jayson = require('jayson'),
      getPort = require('get-port'),
      client = jayson.client.http('http://localhost:9200')

function convertToPythonBool (bool) {
  bool = !!bool
  return (bool) ? "True" : "False"
}

function sendEval (code, save, callback, step) {
  return new Promise(resolve => {
    getPort().then(port => {

      let httpTempServer = null

      let s = jayson.server({
        step: (result, cbStep) => {
          step.cb = cbStep
          if (callback)
            callback(result, resolve)
          httpTempServer.close() 
        }
      })

      httpTempServer = s.http()
      httpTempServer.listen(port)

      step.cb(null, {
        "eval": code,
        "save": save,
        "port": port
      })
    })
  })
}

function sendCommand (command, args, callback) {
  return new Promise(resolve => {
    client.request(command, args, function(err, error, result) {
      if(err) throw err;
      if (callback)
        callback(result, resolve)
    })
  })
}

module.exports = {
  convertToPythonBool,
  sendEval,
  sendCommand
}