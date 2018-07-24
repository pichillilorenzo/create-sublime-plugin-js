// @flow

const fs = require('fs'),
      path = require('path'),
      jayson = require('jayson'),
      getPort = require('get-port'),
      globby = require('globby')

let textCommands = require('./jslib/textCommandList.js')
let windowCommands = require('./jslib/windowCommandList.js')
let applicationCommands = require('./jslib/applicationCommandList.js')

const entries = globby.sync([
  path.join(__dirname, 'src', 'commands', '**', '*.js'),
  path.join(__dirname, 'src', 'listeners', '**', '*.js')
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
  JsonRpcMethods[textCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    try {
      textCommands[textCommand]._init(args[0])
      await textCommands[textCommand].run(args[1], args[2].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END"
    })
  }

  JsonRpcMethods["is_enabled_" + textCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    let is_enabled = true

    try {
      textCommands[textCommand]._init(args[0])
      is_enabled = await textCommands[textCommand].is_enabled(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END",
      "is_enabled": is_enabled
    })
  }

  JsonRpcMethods["is_visible_" + textCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    let is_visible = true

    try {
      textCommands[textCommand]._init(args[0])
      is_visible = await textCommands[textCommand].is_visible(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END",
      "is_visible": is_visible
    })
  }
}

for (let windowCommand in windowCommands) {
  JsonRpcMethods[windowCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    try {
      windowCommands[windowCommand]._init(args[0])
      await windowCommands[windowCommand].run(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END"
    })
  }

  JsonRpcMethods["is_enabled_" + windowCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    let is_enabled = true

    try {
      windowCommands[windowCommand]._init(args[0])
      is_enabled = await windowCommands[windowCommand].is_enabled(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END",
      "is_enabled": is_enabled
    })
  }

  JsonRpcMethods["is_visible_" + windowCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    let is_visible = true

    try {
      windowCommands[windowCommand]._init(args[0])
      is_visible = await windowCommands[windowCommand].is_visible(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END",
      "is_visible": is_visible
    })
  }
}

for (let applicationCommand in applicationCommands) {
  JsonRpcMethods[applicationCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    try {
      applicationCommands[applicationCommand]._init(args[0])
      await applicationCommands[applicationCommand].run(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END"
    })
  }

  JsonRpcMethods["is_enabled_" + applicationCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    let is_enabled = true

    try {
      applicationCommands[applicationCommand]._init(args[0])
      is_enabled = await applicationCommands[applicationCommand].is_enabled(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END",
      "is_enabled": is_enabled
    })
  }

  JsonRpcMethods["is_visible_" + applicationCommand] = async (args, cbStep) => {
    let step = {
      cb: cbStep
    }

    let is_visible = true

    try {
      applicationCommands[applicationCommand]._init(args[0])
      is_visible = await applicationCommands[applicationCommand].is_visible(args[1].value, step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END",
      "is_visible": is_visible
    })
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
