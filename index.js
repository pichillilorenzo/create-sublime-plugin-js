// @flow

const jayson = require('jayson')
const client = jayson.client.http('http://localhost:9200')

const sublime = require('./lib/sublime.js'),
      TextCommand = require('./lib/textCommand.js')

let textCommands = require('./lib/textCommandList.js')


class testCommand extends TextCommand {

  async run (edit, args, kwargs, step) {

    let view = await this.view(step)

    let region = await sublime.Region(0, 10)

    sublime.set_timeout(async (httpTempServer, cbStep) => {
      result = await view.substr(region, cbStep)
      console.log(result)
      httpTempServer.close()
    }, 3000)

    await region.a(step, 8)

    // let result = await view.insert(edit, 0, 'asd', step)

    // console.log(result)

    // result = await view.is_dirty(step)

    // sublime.set_timeout_async(async (httpTempServer, cbStep) => {
    //   result = await view.substr(region, cbStep)
    //   console.log("a1")
    //   console.log(result)
    //   httpTempServer.close()

    //   sublime.set_timeout_async(async (httpTempServer, cbStep) => {
    //     result = await view.set_scratch(true, cbStep)
    //     console.log("a2")
    //     console.log(result)
    //     httpTempServer.close()
    //     sublime.set_timeout_async(async (httpTempServer, cbStep) => {
    //       result = await view.is_dirty(cbStep)
    //       console.log("a3")
    //       console.log(result)
    //       httpTempServer.close()
    //     }, 0)
    //   }, 0)
    // }, 100)


    let result = await view.substr(region, step)
    console.log(result)

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
      textCommands[textCommand]._init(args[0], args[1], args[2], args[3])
      await textCommands[textCommand].run(args[1], args[2], args[3], step) 
    } catch(e) {
      console.log(e);
    }

    step.cb(null, {
      "end_cb_step": "END"
    })
  }
}

let server = jayson.server(JsonRpcMethods);
server.http().listen(3001);

sublime.load_binary_resource("Packages/Default/Main.sublime-menu").then((result) => {console.log(result)})