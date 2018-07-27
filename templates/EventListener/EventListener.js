const EventListener = require('create-sublime-plugin-js').EventListener,
      sublime = require('create-sublime-plugin-js').sublime

class {{listenerName}}Listener extends EventListener {

  async run (args, step) {
    
    

  }

  async is_enabled (args, step) {
    return true
  }

  async is_visible (args, step) {
    return true
  }

}

module.exports = {{listenerName}}Listener