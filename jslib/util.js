// @flow

const fs = require('fs'),
      path = require('path'),
      jayson = require('jayson'),
      getPort = require('get-port'),
      sublimePort = fs.readFileSync( path.join(path.dirname(__dirname), 'sublime_port.txt') ).toString('utf8'),
      client = jayson.client.http('http://localhost:' + sublimePort),
      PythonError = require('./PythonError.js'),
      StepObject = require('./StepObject.js')

function convertToPythonBool (bool /*: any*/) /*: string*/ {
  bool = !!bool
  return (bool) ? "True" : "False"
}

function convertToPythonNone (variable /*: any*/) /*: string | any*/ {
  return (variable == null || variable == undefined) ? "None" : variable
}

function sendEval (code /*: string*/, save /*: boolean*/, callback /*: (any, (any) => void, (any) => void) => void | null*/, step /*: StepObject*/) /*: Promise<any>*/ {
  return new Promise((resolve, reject) => {
    getPort().then(port => {

      let httpTempServer = null

      let s = jayson.server({
        step: (result, cbStep) => {
          step.appendCbStep(cbStep)
          if (callback)
            callback(result, resolve, reject)
          httpTempServer.close() 
        }
      })

      httpTempServer = s.http()
      httpTempServer.listen(port)

      step.sendData(null, {
        "eval": code,
        "save": save,
        "port": port
      })
    })
  })
}

function sendCommand (command /*: string*/, args /*: Array<any>*/, callback /*: ?(any, (any) => void, (any) => void) => void*/) /*: Promise<any>*/ {
  return new Promise((resolve, reject) => {
    client.request(command, args, function(err, error, result) {
      if(err) throw err;
      if (callback)
        callback(result, resolve, reject)
    })
  })
}

function getMapToVariableName(variable /*: Object*/) /*: string | null*/ {
  return (variable.hasOwnProperty("mapTo") && variable.mapTo) ? variable.mapTo : (variable.hasOwnProperty("self") && variable.self.mapTo) ? variable.self.mapTo : null
}

function simpleCommand (command /*: string*/, args /*: Array<any>*/, callbackFilter /*: ?(any, Object) => any*/) /*: Promise<any>*/ {
  return sendCommand(command, args, (result, resolve, reject) => {
        let err = (result.error) ? new PythonError(result.error) : null
        if (err) 
          reject(err)
        else
          resolve( (callbackFilter) ? callbackFilter(result.value, result) : result.value )
      })
}

function simpleEval (code /*: string*/, save /*: boolean*/ = true, step /*: ?StepObject*/ = null, callbackFilter /*: ?(any, Object) => any*/ = null) /*: Promise<any>*/ {
  if (step) 
    return sendEval(code, save, (result, resolve, reject) => {
        let err = (result[0].error) ? new PythonError(result[0].error) : null
        if (err) 
          reject(err)
        else
          resolve( (callbackFilter) ? callbackFilter(result[0].value, result[0]) : result[0].value )
      }, step)
  else
    return simpleCommand('evalCode', [code, save], callbackFilter)
}

async function callbackPython (code /*: string*/, save /*: boolean*/, callbacks /*: Array<Function>*/, step /*: ?StepObject*/ = null, callbackFilter /*: ?(any, Object) => any*/) /*: Promise<any>*/ {

  let httpTempServers = []

  for (let i = 0, length1 = callbacks.length; i < length1; i++) {
    let callback = callbacks[i]
    let tempServer = jayson.server({
      callback: async (args, cbStep) => {

        let step = new StepObject(cbStep)

        try {
          await callback(httpTempServers, ...args, step)
        } catch(e) {
          console.log(e);
        }

        step.sendData(null, {
          'end_cb_step': 'END'
        })
      }
    })
    httpTempServers.push(tempServer.http())
  }

  for(let i = 0, length1 = httpTempServers.length; i < length1; i++){
    let port = await getPort()
    let httpTempServer = httpTempServers[i]
    httpTempServer.listen(port)
    code = code.replace("$PORT_TOKEN", port) 
  }

  if (step) 
    return sendEval(code, save, (result, resolve, reject) => {
        let err = (result[0].error) ? new PythonError(result[0].error) : null
        if (err) 
          reject(err)
        else
          resolve( (callbackFilter) ? callbackFilter(result[0].value, result[0]) : result[0].value )
      }, step)
  else
    return simpleCommand('evalCode', [code, save], callbackFilter)
}

function freeMemory (mappedVars /*: Array<Object>*/, step /*: ?StepObject*/) /*: Promise<any> | void*/ {
  if (mappedVars.length > 0) {
    let mappedVarsStringified = mappedVars.map((item /*: Object*/) => {
      if (item.hasOwnProperty("self"))
        delete item.self.code
      else if (item.hasOwnProperty("code"))
        delete item.code
      return JSON.stringify(item)
    })
    return simpleEval(`freeMemory(json.loads("""[${mappedVarsStringified.join(',')}]"""))`, false, step)
  }
}

module.exports = {
  convertToPythonBool,
  convertToPythonNone,
  sendEval,
  sendCommand,
  getMapToVariableName,
  simpleEval,
  simpleCommand,
  callbackPython,
  freeMemory
}