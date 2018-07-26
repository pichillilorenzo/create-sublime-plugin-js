const fs = require('fs'),
      path = require('path'),
      jayson = require('jayson'),
      getPort = require('get-port'),
      globby = require('globby'),
      sublime = require('create-sublime-plugin-js').sublime,
      StepObject = require('create-sublime-plugin-js').StepObject

let textCommands = require('create-sublime-plugin-js').textCommandList
let windowCommands = require('create-sublime-plugin-js').windowCommandList
let applicationCommands = require('create-sublime-plugin-js').applicationCommandList

const entries = globby.sync([
  path.join(__dirname, 'src', 'commands', '**', '*Command.js'),
  path.join(__dirname, 'src', 'listeners', '**', '*Listener.js')
])

for (let entry of entries) {
  /*
  Load commands and listeners
   */
  // $Ignore
  let entryClass = require(entry)
  new entryClass()
}

let JsonRpcMethods = {}

for (let textCommand in textCommands) {

  let methods = ['run', 'is_enabled', 'is_visible', 'description', 'want_event']
  let methodsDefaultValue = [null, true, true, null, false]

  for(let i = 0, length1 = methods.length; i < length1; i++){
    let method = methods[i]
    let methodDefaultValue = methodsDefaultValue[i]

    JsonRpcMethods[method + '_' + textCommand] = async (args, cbStep) => {
      
      let step = new StepObject(cbStep)
      let result = methodDefaultValue

      try {
        textCommands[textCommand]._init(args[0], step)
        result = await ( (method == 'run') ? 
          textCommands[textCommand].run(sublime.Edit(args[1]), args[2].value, step) : 
          textCommands[textCommand][method](args[1].value, step) )
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = result

      step.sendData(null, data)
    }
  }

}

for (let windowCommand in windowCommands) {

  let methods = ['run', 'is_enabled', 'is_visible', 'description']
  let methodsDefaultValue = [null, true, true, null]

  for(let i = 0, length1 = methods.length; i < length1; i++){
    let method = methods[i]
    let methodDefaultValue = methodsDefaultValue[i]

    JsonRpcMethods[method + '_' + windowCommand] = async (args, cbStep) => {
      
      let step = new StepObject(cbStep)
      let result = methodDefaultValue

      try {
        windowCommands[windowCommand]._init(args[0], step)
        result = await windowCommands[windowCommand][method](args[1].value, step)
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = result

      step.sendData(null, data)
    }
  }

}

for (let applicationCommand in applicationCommands) {

  let methods = ['run', 'is_enabled', 'is_visible', 'is_checked', 'description']
  let methodsDefaultValue = [null, true, true, true, null]

  for(let i = 0, length1 = methods.length; i < length1; i++){
    let method = methods[i]
    let methodDefaultValue = methodsDefaultValue[i]

    JsonRpcMethods[method + '_' + applicationCommand] = async (args, cbStep) => {
      
      let step = new StepObject(cbStep)
      let result = methodDefaultValue

      try {
        applicationCommands[applicationCommand]._init(args[0], step)
        result = await applicationCommands[applicationCommand][method](args[1].value, step)
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = result

      step.sendData(null, data)
    }
  }

}

async function plugin_loaded() {
  try {
    fs.accessSync( path.join(__dirname, 'index.js') )
  } catch(e) {
    return
  }

  require('./index.js')()
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p)
  console.log('reason:', reason)
  process.exit(1)
})

let server = jayson.server(JsonRpcMethods)
getPort().then(port => {
  try {
    fs.accessSync( path.join(__dirname, 'sublime_port.txt') )
  } catch(e) {
    console.log(e)
    return
  }
  fs.writeFileSync(path.join(__dirname, 'node_port.txt'), port , {flag: 'w+'})
  server.http().listen(port)
  // Send to Sublime the port used by this server
  process.stdout.write(port + '\n')
  plugin_loaded()
})
