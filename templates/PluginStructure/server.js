const fs = require('fs'),
      path = require('path'),
      jayson = require('jayson'),
      getPort = require('get-port'),
      globby = require('globby'),
      sublime = require('create-sublime-plugin-js').sublime,
      StepObject = require('create-sublime-plugin-js').StepObject,
      View = require('create-sublime-plugin-js').View,
      Settings = require('create-sublime-plugin-js').Settings

let textCommands = require('create-sublime-plugin-js').textCommandList
let windowCommands = require('create-sublime-plugin-js').windowCommandList
let applicationCommands = require('create-sublime-plugin-js').applicationCommandList
let eventListeners = require('create-sublime-plugin-js').eventListenerList
let viewEventListeners = require('create-sublime-plugin-js').viewEventListenerList

const entries = globby.sync([
  path.join(__dirname, 'src', 'commands', '**', '*Command.js'),
  path.join(__dirname, 'src', 'listeners', '**', '*Listener.js')
])

for (let entry of entries) {
  /*
  Load commands and listeners
   */
  // $Ignore
  let classOrClasses /*: Array | any*/ = require(entry)
  if (classOrClasses instanceof Array)
    for (let c of classOrClasses)
      new c()
  else
    new classOrClasses()
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
          textCommands[textCommand].run(sublime.Edit(args[1]), args[2], step) : 
          textCommands[textCommand][method](args[1], step) )
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = (result === undefined) ? null : result

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
        result = await windowCommands[windowCommand][method](args[1], step)
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = (result === undefined) ? null : result

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
        result = await applicationCommands[applicationCommand][method](args[1], step)
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = (result === undefined) ? null : result

      step.sendData(null, data)
    }
  }

}

for (let eventListener in eventListeners) {

  let methods = ["on_activated", "on_activated_async", "on_clone", "on_clone_async", "on_close", "on_deactivated", "on_deactivated_async", "on_hover", "on_load", "on_load_async", "on_modified", "on_modified_async", "on_new", "on_new_async", "on_post_save", "on_post_save_async", "on_post_text_command", "on_post_window_command", "on_pre_close", "on_pre_save", "on_pre_save_async", "on_query_completions", "on_query_context", "on_selection_modified", "on_selection_modified_async", "on_text_command", "on_window_command"]
  let methodsDefaultValue = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

  for(let i = 0, length1 = methods.length; i < length1; i++){
    let method = methods[i]
    let methodDefaultValue = methodsDefaultValue[i]

    JsonRpcMethods[method + '_' + eventListener] = async (args, cbStep) => {
      
      let step = new StepObject(cbStep)
      let result = methodDefaultValue

      try {
        eventListeners[eventListener]._init(args[0], step)
        switch (method) {
          case "on_hover":
          case "on_query_completions":
          case "on_text_command":
          case "on_window_command":
          case "on_post_text_command":
          case "on_post_window_command":
            result = await eventListeners[eventListener][method](new View(args[1], step, true), args[2], args[3], step)
            break
          case "on_query_context":
            result = await eventListeners[eventListener][method](new View(args[1], step, true), args[2], args[3], args[4], args[5], step)
            break
          default:
            result = await eventListeners[eventListener][method](new View(args[1], step, true), step)
            break
        }
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = (result === undefined) ? null : result

      step.sendData(null, data)
    }
  }

}

for (let viewEventListener in viewEventListeners) {

  let methods = ["is_applicable", "applies_to_primary_view_only", "on_activated", "on_activated_async", "on_close", "on_deactivated", "on_deactivated_async", "on_hover", "on_load", "on_load_async", "on_modified", "on_modified_async", "on_post_save", "on_post_save_async", "on_post_text_command", "on_pre_close", "on_pre_save", "on_pre_save_async", "on_query_completions", "on_query_context", "on_selection_modified", "on_selection_modified_async", "on_text_command"]
  let methodsDefaultValue = [true, false, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

  for(let i = 0, length1 = methods.length; i < length1; i++){
    let method = methods[i]
    let methodDefaultValue = methodsDefaultValue[i]

    JsonRpcMethods[method + '_' + viewEventListener] = async (args, cbStep) => {
      
      let step = new StepObject(cbStep)
      let result = methodDefaultValue

      try {
        viewEventListeners[viewEventListener]._init(args[0], step)
        switch (method) {
          case "is_applicable":
            result = await viewEventListeners[viewEventListener][method](new Settings(args[1], step, true), step)
            break
          case "on_hover":
          case "on_query_completions":
          case "on_text_command":
          case "on_window_command":
          case "on_post_text_command":
          case "on_post_window_command":
            result = await viewEventListeners[viewEventListener][method](args[1], args[2], step)
            break
          case "on_query_context":
            result = await viewEventListeners[viewEventListener][method](args[1], args[2], args[3], args[4], step)
            break
          default:
            result = await viewEventListeners[viewEventListener][method](step)
            break
        }
      } catch(e) {
        console.log(e);
      }

      let data = {
        "end_cb_step": "END"
      }
      data[method] = (result === undefined) ? null : result

      step.sendData(null, data)
    }
  }

}

JsonRpcMethods['plugin_unloaded'] = async (args, cbStep) => {
      
  let step = new StepObject(cbStep)
  let result = null

  try {
    fs.accessSync( path.join(__dirname, 'index.js') )
    let plugin_unloaded = require('./index.js').plugin_unloaded
    if (plugin_unloaded)
      result = await plugin_unloaded()
  } catch(e) {}

  let data = {
    "end_cb_step": "END",
    "plugin_unloaded": (result === undefined) ? null : result
  }

  step.sendData(null, data)
}

async function plugin_loaded() {
  try {
    fs.accessSync( path.join(__dirname, 'index.js') )
  } catch(e) {
    return
  }

  let plugin_loaded = require('./index.js').plugin_loaded
  if (plugin_loaded)
    plugin_loaded()
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
