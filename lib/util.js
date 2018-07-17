// @flow

const jayson = require('jayson'),
      getPort = require('get-port'),
      client = jayson.client.http('http://localhost:9200')

function convertToPythonBool (bool /*: any*/) {
  bool = !!bool
  return (bool) ? "True" : "False"
}

function sendEval (code /*: string*/, save /*: boolean*/, callback /*: Function | null*/, step /*: Object*/) {
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

function sendCommand (command /*: string*/, args /*: Array<any>*/, callback /*: ?Function*/) {
  return new Promise(resolve => {
    client.request(command, args, function(err, error, result) {
      if(err) throw err;
      if (callback)
        callback(result, resolve)
    })
  })
}

function getMapToVariableName(variable /*: Object*/) {
  return (variable.hasOwnProperty("mapTo") && variable.mapTo) ? variable.mapTo : (variable.hasOwnProperty("self") && variable.self.mapTo) ? variable.self.mapTo : null
}

module.exports = {
  convertToPythonBool,
  sendEval,
  sendCommand,
  getMapToVariableName
}