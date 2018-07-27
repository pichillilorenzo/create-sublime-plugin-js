const ViewEventListener = require('create-sublime-plugin-js').ViewEventListener,
      sublime = require('create-sublime-plugin-js').sublime

class {{listenerName}}Listener extends ViewEventListener {

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