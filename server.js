// @flow

const fs = require('fs'),
      path = require('path'),
      jayson = require('jayson'),
      getPort = require('get-port'),
      globby = require('globby'),
      StepObject = require('./jslib/StepObject.js'),
      sublime = require('./jslib/sublime.js')

let textCommands = require('./jslib/textCommandList.js')
let windowCommands = require('./jslib/windowCommandList.js')
let applicationCommands = require('./jslib/applicationCommandList.js')

const entries = globby.sync([
  path.join(__dirname, 'src', 'commands', '**', '*Command.js'),
  path.join(__dirname, 'src', 'listeners', '**', '*Listener.js')
])

for (let entry of entries) {
  /*
  Load commands and listeners
   */
  // $Ignore
  require(entry)
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
        textCommands[textCommand]._init(args[0])
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
        windowCommands[windowCommand]._init(args[0])
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
        applicationCommands[applicationCommand]._init(args[0])
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


async function main() {
  try {
    // let result = null
    // result = await sublime.error_message("Error")
    // console.log(result)
    // result = await sublime.message_dialog("Message Dialog")
    // console.log(result)
    // result = await sublime.ok_cancel_dialog("Message Dialog", "OK")
    // console.log(result)
    // result = await sublime.yes_no_cancel_dialog("Message Dialog", "YES", "NO")
    // console.log(result)
    // result = await sublime.load_resource("Packages/Default/Main.sublime-menu")
    // console.log(result)
    // result = await sublime.load_binary_resource("Packages/Default/Main.sublime-menu")
    // console.log(result)
    // result = await sublime.find_resources('*')
    // console.log(result)
    // result = await sublime.Region(0, 34)
    // console.log(result)
    // console.log(await result.a())
    // await result.a(5)
    // await result.b(10)
    // console.log(result)
    // console.log(await result.size())
    // console.log(await result.empty())
    // result = await sublime.encode_value({ region: 0 })
    // console.log(result)
    // result = await sublime.decode_value('{"region": 0}')
    // console.log(result)
    // result = await sublime.expand_variables("Hello ${name}", {"name": 'Lorenzo'})
    // console.log(result)
    // let region = await sublime.Region(3, 10)
    // console.log(await region.begin())
    // let fixPathSettings = await sublime.load_settings("Preferences.sublime-settings")
    // await fixPathSettings.clear_on_change('fixpath-reload')
    // fixPathSettings.add_on_change('fixpath-reload', async () => {
    //   console.log("asdasd")
    //   let region2 = await sublime.Region(3, 10)
    //   console.log(await region2.begin())
    // })
    // let windows = await sublime.windows()
    // console.log(await (await windows[0].new_file()).id())
    // console.log(await (await windows[0].open_file('/Users/lorenzo/Library/Application Support/Sublime Text 3/Packages/test1/node_port.txt', sublime.ENCODED_POSITION | sublime.TRANSIENT)).id())
    // console.log(await (await sublime.active_window()).id())
    // console.log(await sublime.packages_path())
    // console.log(await sublime.installed_packages_path())
    // console.log(await sublime.cache_path())
    // console.log(await sublime.get_clipboard())
    // console.log(await sublime.set_clipboard("asdasd"))
    // console.log(await sublime.score_selector('script.js', 'script.js'))
    // console.log(await sublime.get_macro())
    // await sublime.run_command('show_about_window', {})
    // await sublime.log_commands(true)
    // await sublime.log_input(true)
    // await sublime.log_result_regex(true)
    // console.log(await sublime.version())
    // console.log(await sublime.platform())
    // console.log(await sublime.arch())
  } catch(e) {
    // statements
    console.log(e);
  }
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
  main()
})
