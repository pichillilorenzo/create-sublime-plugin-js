// @flow

const WindowCommand = require('../../jslib/WindowCommand.js'),
      sublime = require('../../jslib/sublime.js')

class test2Command extends WindowCommand {

  async run (args, step) {
    // console.log(args)
    // console.log(this)

    let w = await this.window(step)

    // console.log(await w.new_file(step))
    // console.log(await w.find_open_file('main.py', step))
    // console.log(await w.active_sheet(step))
    // console.log(await w.active_view(step))
    // console.log(await w.folders(step))
    // await w.show_quick_panel(['ads','asd'], (index, subStep) => {
    //   console.log('on_done ' + index)
    // }, 0, -1, (index, subStep) => {
    //   console.log('on_navigation ' + index)
    // }, step)
    // await w.show_input_panel("caption", "initial_text", (input) => {
    //   console.log("on_done " + input)
    // }, (input) => {
    //   console.log("on_change " + input)
    // }, () => {
    //   console.log("cancel")
    // }, step)
    // console.log(await w.create_output_panel("Test Output Panel", false, step))
    // console.log(await w.find_output_panel("Test Output Panel", step))
    // sublime.set_timeout_async(async (subStep) => {
    //   await w.destroy_output_panel("Test Output Panel", subStep)
    // }, 5000)
    // console.log(await w.active_panel(step))
    // console.log(await w.panels(step))
    console.log(await w.extract_variables(step))
    
  }

}

module.exports = new test2Command()