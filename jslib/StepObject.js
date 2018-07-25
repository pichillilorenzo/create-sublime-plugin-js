// @flow

class StepObject {

  /*::
  cbSteps: Array<null | (Object | null, Object | null) => void>
   */
  
  constructor (cbStep /*: (Object | null, Object | null) => void*/) {
    this.cbSteps = [cbStep]
  }

  appendCbStep (cbStep /*: (Object | null, Object | null) => void*/) {
    this.cbSteps.push(cbStep)
  }

  sendData (error /*: Object | null*/, data /*: Object | null*/) /*: void*/ {
    let found = false
    for(let i = this.cbSteps.length-1; i >= 0; i--){
      let step = this.cbSteps[i]
      if (step) {
        found = true
        step(error, data)
        this.cbSteps[i] = null
        break
      }
    }
    if (!found) 
      throw new Error(`required "await" not found when using "step" parameter! Check your code.`)
  }

}

module.exports = StepObject