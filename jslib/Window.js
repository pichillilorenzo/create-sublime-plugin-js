// @flow

const util = require('./util.js'),
      View = require('./View.js'),
      Sheet = require('./Sheet.js'),
      SublimeObject = require('./SublimeObject.js')

/**
 * Represents a window ([sublime.Window Class](https://www.sublimetext.com/docs/3/api_reference.html#sublime.Window)).
 *
 * **NOTE**: use [sublime.Window()](#sublimewindow) to instantiate a window.
 */
class Window extends SublimeObject {

  constructor (self /*: MappedVariable | null*/, stepRequired /*: boolean*/, codeChainString /*: string*/ = '') {
    super(self, stepRequired, codeChainString)
  }

  /**
   * Returns a number that uniquely identifies this window.
   */
  id (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `id()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Creates a new file. The returned view will be empty, and its ```is_loaded()``` method will return ```true```.
   */
  new_file (step /*: ?StepObject*/) /*: Promise<View> | View*/ {

    let methodCode = `new_file()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new View(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Opens the named file, and returns the corresponding view. If the file is already opened, it will be brought to the front. Note that as file loading is asynchronous, operations on the returned view won't be possible until its ```is_loading()``` method returns ```false```.
   * 
   * The optional ```flags``` parameter is a bitwise combination of:
   * - ```sublime.ENCODED_POSITION```: Indicates the file_name should be searched for a ```:row``` or ```:row:col``` suffix
   * - ```sublime.TRANSIENT```: Open the file as a preview only: it won't have a tab assigned it until modified.
   */
  open_file (file_name /*: string*/, flags /*: number*/ = 0, step /*: ?StepObject*/) /*: Promise<View> | View*/ {

    let methodCode = `open_file("""${file_name}""", ${flags})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new View(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Finds the named file in the list of open files, and returns the corresponding View, or ```null``` if no such file is open.
   */
  find_open_file (file_name /*: string*/, step /*: ?StepObject*/) /*: Promise<View | null> | View*/ {

    let methodCode = `find_open_file("""${file_name}""")`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        if (result == "SublimeObject")
          return new View(resultObject, this.stepRequired)
        else
          return null
      })
    }, !!(step && this.self))

  }

  /**
   * Returns the currently focused sheet.
   */
  active_sheet (step /*: ?StepObject*/) /*: Promise<Sheet> | Sheet*/ {

    let methodCode = `active_sheet()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Sheet(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Sheet(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Returns the currently focused sheet.
   */
  active_view (step /*: ?StepObject*/) /*: Promise<View> | View*/ {

    let methodCode = `active_view()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new View(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Returns the currently focused sheet in the given ```group```.
   */
  active_sheet_in_group (group /*: number*/, step /*: ?StepObject*/) /*: Promise<Sheet> | Sheet*/ {

    let methodCode = `active_sheet_in_group(${group})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new Sheet(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new Sheet(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Returns the currently edited view in the given ```group```.
   */
  active_view_in_group (group /*: number*/, step /*: ?StepObject*/) /*: Promise<View> | View*/ {

    let methodCode = `active_view_in_group(${group})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new View(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Returns all open sheets in the window.
   */
  sheets (step /*: ?StepObject*/) /*: Promise<Array<Sheet>>*/ {

    this.checkStep(step)

    let methodCode = `sheets()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''
    
    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let sheets = []
        for (let sheet of resultObject.value) {
          sheets.push(new Sheet(sheet, this.stepRequired))
        }
        return sheets
      })
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let sheets = []
        for (let sheet of resultObject.value) {
          sheets.push(new Sheet(sheet, this.stepRequired))
        }
        return sheets
      })
    }, !!(step && this.self))

  }

  /**
   * Returns all open sheets in the given ```group```.
   */
  sheets_in_group (group /*: number*/, step /*: ?StepObject*/) /*: Promise<Array<Sheet>>*/ {

    this.checkStep(step)

    let methodCode = `sheets_in_group(${group})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''
    
    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let sheets = []
        for (let sheet of resultObject.value) {
          sheets.push(new Sheet(sheet, this.stepRequired))
        }
        return sheets
      })
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let sheets = []
        for (let sheet of resultObject.value) {
          sheets.push(new Sheet(sheet, this.stepRequired))
        }
        return sheets
      })
    }, !!(step && this.self))

  }

  /**
   * Returns all open views in the window.
   */
  views (step /*: ?StepObject*/) /*: Promise<Array<View>>*/ {

    this.checkStep(step)

    let methodCode = `views()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''
    
    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let views = []
        for (let view of resultObject.value) {
          views.push(new View(view, this.stepRequired))
        }
        return views
      })
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let views = []
        for (let view of resultObject.value) {
          views.push(new View(view, this.stepRequired))
        }
        return views
      })
    }, !!(step && this.self))

  }

  /**
   * Returns all open views in the given ```group```.
   */
  views_in_group (group /*: number*/, step /*: ?StepObject*/) /*: Promise<Array<View>>*/ {

    this.checkStep(step)

    let methodCode = `views_in_group(${group})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''
    
    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step, (result, resultObject) => {
        let views = []
        for (let view of resultObject.value) {
          views.push(new View(view, this.stepRequired))
        }
        return views
      })
    }, () => {
      return util.simpleEval(completeCode, false, step, (result, resultObject) => {
        let views = []
        for (let view of resultObject.value) {
          views.push(new View(view, this.stepRequired))
        }
        return views
      })
    }, !!(step && this.self))

  }

  /**
   * Returns the number of view groups in the window.
   */
  num_groups (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `num_groups()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns the index of the currently selected group.
   */
  active_group (step /*: ?StepObject*/) /*: Promise<number>*/ {

    this.checkStep(step)

    let methodCode = `active_group()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Makes the given ```group``` active.
   */
  focus_group (group /*: number*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `focus_group(${group})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Switches to the given ```sheet```.
   */
  focus_sheet (sheet /*: Sheet*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `focus_sheet(${sheet.getPythonCode()})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Switches to the given ```view```.
   */
  focus_view (view /*: View*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `focus_view(${view.getPythonCode()})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns the group, and index within the group of the ```sheet```. Returns ```[-1, -1]``` if not found.
   */
  get_sheet_index (sheet /*: Sheet*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `get_sheet_index(${sheet.getPythonCode()})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Moves the ```sheet``` to the given ```group``` and ```index```.
   */
  set_sheet_index (sheet /*: Sheet*/, group /*: number*/, index /*: number*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_sheet_index(${sheet.getPythonCode()}, ${group}, ${index})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns the group, and index within the group of the ```view```. Returns ```[-1, -1]``` if not found.
   */
  get_view_index (view /*: View*/, step /*: ?StepObject*/) /*: Promise<[number, number]>*/ {

    this.checkStep(step)

    let methodCode = `get_view_index(${view.getPythonCode()})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Moves the ```view``` to the given ```group``` and ```index```.
   */
  set_view_index (view /*: View*/, group /*: number*/, index /*: number*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_view_index(${view.getPythonCode()}, ${group}, ${index})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Show a message in the status bar.
   */
  status_message (string /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `status_message("""${string}""")`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns ```true``` if the menu is visible.
   */
  is_menu_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_menu_visible()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Controls if the menu is visible.
   */
  set_menu_visible (flag /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let flagBool = util.convertToPythonBool(flag)

    this.checkStep(step)

    let methodCode = `set_menu_visible(${flagBool})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns ```true``` if the sidebar will be shown when contents are available.
   */
  is_sidebar_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_sidebar_visible()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Sets the sidebar to be shown or hidden when contents are available.
   */
  set_sidebar_visible (flag /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let flagBool = util.convertToPythonBool(flag)

    this.checkStep(step)

    let methodCode = `set_sidebar_visible(${flagBool})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns ```true``` if tabs will be shown for open files.
   */
  get_tabs_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `get_tabs_visible()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Controls if tabs will be shown for open files.
   */
  set_tabs_visible (flag /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let flagBool = util.convertToPythonBool(flag)

    this.checkStep(step)

    let methodCode = `set_tabs_visible(${flagBool})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns ```true``` if the minimap is enabled.
   */
  is_minimap_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_minimap_visible()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Controls the visibility of the minimap.
   */
  set_minimap_visible (flag /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let flagBool = util.convertToPythonBool(flag)

    this.checkStep(step)

    let methodCode = `set_minimap_visible(${flagBool})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns ```true``` if the status bar will be shown.
   */
  is_status_bar_visible (step /*: ?StepObject*/) /*: Promise<boolean>*/ {

    this.checkStep(step)

    let methodCode = `is_status_bar_visible()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Controls the visibility of the status bar.
   */
  set_status_bar_visible (flag /*: boolean*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    let flagBool = util.convertToPythonBool(flag)

    this.checkStep(step)

    let methodCode = `set_status_bar_visible(${flagBool})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns a list of the currently open folders.
   */
  folders (step /*: ?StepObject*/) /*: Promise<Array<string>>*/ {

    this.checkStep(step)

    let methodCode = `folders()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns name of the currently opened project file, if any.
   */
  project_file_name (step /*: ?StepObject*/) /*: Promise<string>*/ {

    this.checkStep(step)

    let methodCode = `project_file_name()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns the project data associated with the current window. The data is in the same format as the contents of a ```.sublime-project``` file.
   */
  project_data (step /*: ?StepObject*/) /*: Promise<Object>*/ {

    this.checkStep(step)

    let methodCode = `project_data()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Updates the project data associated with the current window. If the window is associated with a ```.sublime-project``` file, the project file will be updated on disk, otherwise the window will store the data internally.
   */
  set_project_data (data /*: Object*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `set_project_data(json.loads("""${JSON.stringify(data)}"""))`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Runs the named {@link WindowCommand} with the (optional) given ```args```. This method is able to run any sort of command, dispatching the command via input focus.
   */
  run_command (string /*: any*/, args /*: Object | null*/ = null, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `run_command("""${string}""", json.loads("""${JSON.stringify(args)}"""))`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Shows a quick panel, to select an item in a list. ```on_done``` will be called once, with the index of the selected item. If the quick panel was cancelled, ```on_done``` will be called with an argument of ```-1```.
   * 
   * ```items``` may be a list of strings, or a list of string lists. In the latter case, each entry in the quick panel will show multiple rows.
   * 
   * ```flags``` is a bitwise OR of ```sublime.MONOSPACE_FONT``` and ```sublime.KEEP_OPEN_ON_FOCUS_LOST```
   * 
   * ```on_highlighted```, if given, will be called every time the highlighted item in the quick panel is changed.
   */
  show_quick_panel (items /*: Array<string>*/, on_done /*: (number, ?StepObject) => void*/, flags /*: number*/ = 0, selected_index /*: number*/ = -1, on_highlighted /*: ?(number, ?StepObject) => void*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let callbacks = []

    callbacks.push(async (httpTempServers, index, subStep) => {
      await on_done(index, subStep)

      for (let httpTempServer of httpTempServers) 
        httpTempServer.close()
    })

    callbacks.push(async (httpTempServers, index, subStep) => {
      if (on_highlighted)
        await on_highlighted(index, subStep)
    })

    let methodCode = `show_quick_panel(json.loads("""${JSON.stringify(items)}"""), lambda index: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, index)), ${flags}, ${selected_index}, lambda index: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, index)))`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.callbackPython(this.codeChainString, false, callbacks, step)
    }, () => {
      return util.callbackPython(completeCode, false, callbacks, step)
    }, !!(step && this.self))

  }

  /**
   * Shows the input panel, to collect a line of input from the user. ```on_done``` and ```on_change```, if not ```null```, should both be functions that expect a single string argument. ```on_cancel``` should be a function that expects no arguments. The view used for the input widget is returned.
   */
  show_input_panel (caption /*: string*/, initial_text /*: string*/, on_done /*: ?(string, ?StepObject) => void*/, on_change /*: ?(string, ?StepObject) => void*/, on_cancel /*: ?(?StepObject) => void*/, step /*: ?StepObject*/) /*: Promise<View>*/ {

    this.checkStep(step)

    let callbacks = []

    callbacks.push(async (httpTempServers, userInput, subStep) => {
      if (on_done)
        await on_done(userInput, subStep)
      
      for (let httpTempServer of httpTempServers) 
        httpTempServer.close()
    })

    callbacks.push(async (httpTempServers, userInput, subStep) => {
      if (on_change)
        await on_change(userInput, subStep)
    })

    callbacks.push(async (httpTempServers, subStep) => {
      if (on_cancel)
        await on_cancel(subStep)
      
      for (let httpTempServer of httpTempServers) 
        httpTempServer.close()
    })

    let methodCode = `show_input_panel("""${caption}""", """${initial_text}""", lambda userInput: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, userInput)), lambda userInput: sublime.set_timeout_async(lambda: callback($PORT_TOKEN, userInput)), lambda: sublime.set_timeout_async(lambda: callback($PORT_TOKEN)))`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.callbackPython(this.codeChainString, true, callbacks, step)
    }, () => {
      return util.callbackPython(completeCode, true, callbacks, step)
    }, !!(step && this.self))

  }

  /**
   * Returns the view associated with the named output panel, creating it if required. The output panel can be shown by running the ```show_panel``` window command, with the ```panel``` argument set to the name with an ```"output."``` prefix.
   * 
   * The optional ```unlisted``` parameter is a boolean to control if the output panel should be listed in the panel switcher.
   */
  create_output_panel (name /*: string*/, unlisted /*: ?boolean*/ = false, step /*: ?StepObject*/) /*: Promise<View> | View*/ {

    let unlistedBool = util.convertToPythonBool(unlisted)

    let methodCode = `create_output_panel("""${name}""", ${unlistedBool})`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        return new View(resultObject, this.stepRequired)
      })
    }, !!(step && this.self))

  }

  /**
   * Returns the view associated with the named output panel, or ```null``` if the output panel does not exist.
   */
  find_output_panel (name /*: string*/, step /*: ?StepObject*/) /*: Promise<View | null> | View*/ {

    let methodCode = `find_output_panel("""${name}""")`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return new View(null, this.stepRequired, this.codeChainString)
    }, () => {
      this.checkStep(step)

      return util.simpleEval(completeCode, true, step, (result, resultObject) => {
        if (result == 'SublimeObject')
          return new View(resultObject, this.stepRequired)
        else
          return null
      })
    }, !!(step && this.self))
        
  }

  /**
   * Destroys the named output panel, hiding it if currently open.
   */
  destroy_output_panel (name /*: string*/, step /*: ?StepObject*/) /*: Promise<null>*/ {

    this.checkStep(step)

    let methodCode = `destroy_output_panel("""${name}""")`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns the name of the currently open panel, or ```null``` if no panel is open. Will return built-in panel names (e.g. ```"console"```, ```"find"```, etc) in addition to output panels.
   */
  active_panel (step /*: ?StepObject*/) /*: Promise<string | null>*/ {

    this.checkStep(step)

    let methodCode = `active_panel()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns a list of the names of all panels that have not been marked as unlisted. Includes certain built-in panels in addition to output panels.
   */
  panels (step /*: ?StepObject*/) /*: Promise<Array<string>>*/ {

    this.checkStep(step)

    let methodCode = `panels()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns all locations where the symbol is defined across files in the current project.
   */
  lookup_symbol_in_index (symbol /*: string*/, step /*: ?StepObject*/) /*: Promise<Array<[string, string, [number, number]]>>*/ {

    this.checkStep(step)

    let methodCode = `lookup_symbol_in_index("""${symbol}""")`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns all locations where the symbol is defined across open files.
   */
  lookup_symbol_in_open_files (symbol /*: string*/, step /*: ?StepObject*/) /*: Promise<Array<[string, string, [number, number]]>>*/ {

    this.checkStep(step)

    let methodCode = `lookup_symbol_in_open_files("""${symbol}""")`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

  /**
   * Returns a dictionary of strings populated with contextual keys:
   * 
   * ```packages, platform, file, file_path, file_name, file_base_name, file_extension, folder, project, project_path, project_name, project_base_name, project_extension```. This dict is suitable for passing to ```sublime.expand_variables()```.
   */
  extract_variables (step /*: ?StepObject*/) /*: Promise<Object>*/ {

    this.checkStep(step)

    let methodCode = `extract_variables()`
    let completeCode = (this.self) ? `${this.getMapToCode()}.${methodCode}` : ''

    return this.wrapMethod({
      complete: completeCode,
      pre: ``,
      after: `.${methodCode}`
    }, () => {
      return util.simpleEval(this.codeChainString, false, step)
    }, () => {
      return util.simpleEval(completeCode, false, step)
    }, !!(step && this.self))

  }

}

module.exports = Window