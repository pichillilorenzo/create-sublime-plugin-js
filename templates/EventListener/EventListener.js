const EventListener = require('create-sublime-plugin-js').EventListener,
      sublime = require('create-sublime-plugin-js').sublime

class {{listenerName}}Listener extends EventListener {

  async on_modified (view, step) {
    
    

  }

  async on_modified_async (view, step) {
    


  }

  async on_query_completions (view, prefix, locations, step) {

    

  }

}

module.exports = {{listenerName}}Listener