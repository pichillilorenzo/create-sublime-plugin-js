// @flow

const fs = require('fs'),
      path = require('path'),
      jayson = require('jayson'),
      getPort = require('get-port'),
      sublime = require('./lib/sublime.js'),
      TextCommand = require('./lib/TextCommand.js')

let textCommands = require('./lib/textCommandList.js')

class testCommand extends TextCommand {

  async run (edit, args, step) {
    console.log(args)

    let view = await this.view(step)
    // await view.run_command('test2', null, step)
    // console.log(view)

    let region = await sublime.Region(0, 10)

    // sublime.set_timeout(async (cbStep) => {
    //   await region.a(4)
    //   let result2 = await view.substr(region, cbStep)
    //   console.log(result2)
    // }, 3000)

    // await region.a(2)

    // var result = await view.insert(edit, 0, 'asd', step)
    // console.log(result)

    // result = await view.is_dirty(step)

    // sublime.set_timeout_async(async (cbStep) => {
    //   result = await view.substr(region, cbStep)
    //   console.log("a1")
    //   console.log(result)

    //   sublime.set_timeout_async(async (cbStep) => {
    //     result = await view.set_scratch(true, cbStep)
    //     console.log("a2")
    //     console.log(result)
    //     sublime.set_timeout_async(async (cbStep) => {
    //       result = await view.is_dirty(cbStep)
    //       console.log("a3")
    //       console.log(result)
    //     }, 0)
    //   }, 0)
    // }, 100)


    let result = await view.substr(region, step)
    console.log(result)

    result = await sublime.Region(0,34)
    console.log(result)
    console.log(await result.a())
    await result.a(5)
    await result.b(10)
    console.log(result)
    console.log(await result.size())
    console.log(await result.empty())

    //await this.freeMemory(step)

  }
}

new testCommand()

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
}
async function main() {
  try {
    let result = null
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
    //   let region = await sublime.Region(3, 10)
    //   console.log(await region.begin())
    // })
    // let windows = await sublime.windows()
    // console.log(await (await windows[0].new_file()).id())
    // console.log(await (await windows[0].open_file('/Users/lorenzo/Library/Application Support/Sublime Text 3/Packages/test1/node_port.txt', sublime.ENCODED_POSITION + ' | ' + sublime.TRANSIENT)).id())
    // console.log(await (await sublime.active_window()).id())
    // console.log(await sublime.packages_path())
    // console.log(await sublime.installed_packages_path())
    // console.log(await sublime.cache_path())
    // console.log(await sublime.get_clipboard())
    // console.log(await sublime.set_clipboard("asdasd"))
    // console.log(await sublime.score_selector('script.js', 'script.js'))
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
  process.stdout.write(port + '\n')
  main()
})
