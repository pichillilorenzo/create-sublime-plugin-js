// @flow

const fs = require('fs'),
      path = require('path'),
      jayson = require('jayson'),
      getPort = require('get-port'),
      PythonError = require('./PythonError.js'),
      StepObject = require('./StepObject.js')

function findFileUp (filename/*: string*/) /*: string | null*/ {
  try {
    fs.accessSync( path.join(__dirname, filename) )
    return path.join(__dirname, filename)
  } catch(e) {}

  let parent = __dirname
  let oldParent = parent

  while (true) {
    parent = path.dirname(parent)
    try {
      fs.accessSync( path.join(parent, filename) )
      return path.join(parent, filename)
    } catch(e) {}
    if (parent == oldParent)
      return null
    oldParent = parent
  }
}

const sublimePortPath = findFileUp('sublime_port.txt')
let sublimePort = ''
let client = null

if (sublimePortPath) {
  sublimePort = fs.readFileSync(sublimePortPath).toString('utf8')
  client = jayson.client.http('http://localhost:' + sublimePort)
}
else {
  throw new Error('No sublime_port.txt file found!')
}

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

function isSublimeObject(variable /*: any*/) /*: boolean*/ {
  return variable && variable.hasOwnProperty("value") && variable.value == 'SublimeObject'
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

/**
 * Free memory of ```mappedVars``` on the Python server side.
 */
function freeMemory (mappedVars /*: Array<SublimeObject>*/, step /*: ?StepObject*/) /*: Promise<any> | void*/ {
  if (mappedVars.length > 0) {
    let mappedVarsStringify = []
    for (let mappedVar /*: Object*/ of mappedVars) {
      if (mappedVar.hasOwnProperty("self") && mappedVar.self) {
        delete mappedVar.self.code
        mappedVarsStringify.push(JSON.stringify(mappedVar.self))
      }
    }
    return simpleEval(`freeMemory(json.loads("""[${mappedVarsStringify.join(',')}]"""))`, false, step)
  }
}

/**
 * Free memory of all variables created in the current scope on the Python server side. To cover variables in the callbacks, such as in a set_timeout or set_timeout_async callback, you need to call it also in there.
 */
function freeAllScopeMemory (step /*: StepObject*/) /*: Promise<any> | void*/ {
  if (!step)
    throw new Error(`"step" parameter required!`)
  return simpleEval(`freeMemory(variable_created)`, false, step)
}

module.exports = {
  convertToPythonBool,
  convertToPythonNone,
  sendEval,
  sendCommand,
  isSublimeObject,
  simpleEval,
  simpleCommand,
  callbackPython,
  freeMemory,
  freeAllScopeMemory
}