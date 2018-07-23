const TextCommand = require('create-sublime-plugin-js/TextCommand.js'),
      sublime = require('create-sublime-plugin-js/sublime.js')

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

module.exports = new $commandNameCommand()