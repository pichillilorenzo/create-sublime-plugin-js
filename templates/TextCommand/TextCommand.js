const TextCommand = require('create-sublime-plugin-js').TextCommand,
      sublime = require('create-sublime-plugin-js').sublime

class $commandNameCommand extends TextCommand {

  async run (edit, args, step) {
    
    let view = await this.view(step)

  }

  async is_enabled (args, step) {
    return true
  }

  async is_visible (args, step) {
    return true
  }

}

module.exports = $commandNameCommand