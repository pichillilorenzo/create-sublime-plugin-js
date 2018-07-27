const ViewEventListener = require('create-sublime-plugin-js').ViewEventListener,
      sublime = require('create-sublime-plugin-js').sublime

class {{listenerName}}Listener extends ViewEventListener {

  async on_modified (step) {
    
    

  }

  async on_modified_async (step) {
    


  }

  async on_query_completions (prefix, locations, step) {

    

  }
}

module.exports = {{listenerName}}Listener