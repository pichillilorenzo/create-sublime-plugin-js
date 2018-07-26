// @flow

const eventListenerList = require('./eventListenerList.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Note that many of these events are triggered by the buffer underlying the view, and thus the method is only called once, with the first view as the parameter.
 * 
 * [sublime_plugin.EventListener Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin.EventListener).
 */
class EventListener extends SublimeObject {

  constructor () {
    super(null, null, true)
    eventListenerList[this.constructor.name] = this
  }

  _init (s /*: MappedVariable*/) /*: void*/ {
    this.self = s
  }

  /**
   * Called when a new buffer is created.
   */
  async on_new (view /*: View*/, step /*: StepObject*/) /*: Promise<void>*/ {

  }

}

module.exports = EventListener