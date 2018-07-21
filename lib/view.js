// @flow

const util = require('./util.js'),
      config = require('./config.js'),
      Settings = require('./Settings.js'),
      Window = require('./Window.js')

class View {

  /*::
  self: MappedVariable
  */

  constructor (s /*: MappedVariable*/) {
    this.self = s
  }

  id (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].id()`, false, step)
  }

  buffer_id (step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].buffer_id()`, false, step)
  }

  is_primary (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].is_primary()`, false, step)
  }

  file_name (step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].file_name()`, false, step)
  }

  name (step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].name()`, false, step)
  }

  set_name (name /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].set_name("""${name}""")`, false, step)
  }

  is_loading (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].is_loading()`, false, step)
  }

  is_dirty (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].is_dirty()`, false, step)
  }

  is_read_only (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].is_read_only()`, false, step)
  }

  set_read_only (value /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let read_only = util.convertToPythonBool(value)
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].set_read_only(${read_only})`, false, step)
  }

  is_scratch (step /*: ?StepObject*/) /*: Promise<boolean>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].is_scratch()`, false, step)
  }

  set_scratch (value /*: any*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    value = util.convertToPythonBool(value)
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].set_scratch(${value})`, false, step)
  }

  settings (step /*: ?StepObject*/) /*: Promise<Settings>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].settings()`, true, step, (result, resultObject) => {
      return new Settings(resultObject)
    })
  }

  window (step /*: ?StepObject*/) /*: Promise<Window>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].window()`, true, step, (result, resultObject) => {
      return new Window(resultObject)
    })
  }

  run_command (string /*: any*/, args /*: ?Object*/, step /*: ?StepObject*/) /*: Promise<null>*/ {
    let code = ''

    if (args)
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].run_command("""${string}""", json.dumps("""${JSON.stringify(args)}""", ensure_ascii=False))`
    else
      code = `${config.variable_mapping_name}["${this.self.mapTo}"].run_command("""${string}""")`

    return util.simpleEval(code, false, step)
  }

  insert (edit /*: MappedVariable*/, pos /*: number*/, text /*: string*/, step /*: ?StepObject*/) /*: Promise<number>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].insert(${config.variable_mapping_name}["${edit.mapTo}"], ${parseInt(pos)}, """${text}""")`, false, step)
  }

  substr (region /*: Region*/, step /*: ?StepObject*/) /*: Promise<string>*/ {
    return util.simpleEval(`${config.variable_mapping_name}["${this.self.mapTo}"].substr(${config.variable_mapping_name}["${region.self.mapTo}"])`, false, step)
  }
}

module.exports = View