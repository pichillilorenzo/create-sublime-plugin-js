const ApplicationCommand = require('create-sublime-plugin-js').ApplicationCommand,
      sublime = require('create-sublime-plugin-js').sublime

class {{commandName}}Command extends ApplicationCommand {

  async run (args, step) {
    
    

  }

  async is_enabled (args, step) {
    return true
  }

  async is_visible (args, step) {
    return true
  }

}

module.exports = {{commandName}}Command