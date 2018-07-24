const WindowCommand = require('create-sublime-plugin-js').WindowCommand,
      sublime = require('create-sublime-plugin-js').sublime

class $commandNameCommand extends WindowCommand {

  async run (args, step) {
    
    let w = await this.window(step)

  }

  async is_enabled (args, step) {
    return true
  }

  async is_visible (args, step) {
    return true
  }

}

module.exports = new $commandNameCommand()