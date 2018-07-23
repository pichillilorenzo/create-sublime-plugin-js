// @flow 

class PythonError extends Error {
  constructor(pythonError /*: PythonError*/, ...args /*: Array<any>*/) {
    super(pythonError.message, ...args)
    this.name = this.constructor.name + ' - ' + ((pythonError.code) ? 'Errno ' + pythonError.code : '' ) + pythonError.type
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(this.message)).stack; 
    }
  }
}

module.exports = PythonError