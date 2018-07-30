#!/usr/bin/env node

// @flow

const commander = require('commander'),
  packageJson = require('../package.json'),
  version = packageJson.version,
  fs = require('fs-extra'),
  path = require('path'),
  globby = require('globby'),
  mustache = require('mustache'),
  // imported for eval() function
  TextCommand = require('./TextCommand.js'),
  WindowCommand = require('./WindowCommand.js'),
  ApplicationCommand = require('./ApplicationCommand.js'),
  EventListener = require('./EventListener.js'),
  ViewEventListener = require('./ViewEventListener.js')

const getAllMethods = (obj) => {
  let props = []

  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .sort()
      .filter((p, i, arr) =>
        typeof obj[p] === 'function' &&  //only the methods
        p !== 'constructor' &&           //not the constructor
        (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
        props.indexOf(p) === -1          //not overridden in a child
      )
    props = props.concat(l)
  }
  while (
    (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
    Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
  )

  return props
}

const isCommandParentClass = (obj) => {
  let parentClass = Object.getPrototypeOf(obj)
  while (parentClass.constructor.name != "TextCommand" && parentClass.constructor.name != "WindowCommand" && parentClass.constructor.name != "ApplicationCommand") {
    parentClass = Object.getPrototypeOf(parentClass)
    if (!parentClass)
      return false
  }
  return parentClass.constructor.name
}

const isListenerParentClass = (obj) => {
  let parentClass = Object.getPrototypeOf(obj)
  while (parentClass.constructor.name != "EventListener" && parentClass.constructor.name != "ViewEventListener") {
    parentClass = Object.getPrototypeOf(parentClass)
    if (!parentClass)
      return false
  }
  return parentClass.constructor.name
}

commander
  .version(version)

commander
  .command('init <pluginName>')
  .action((pluginName) => {

    let currAbsPath = path.resolve('.')
    
    pluginName = pluginName.trim()

    let pluginAbsPath = path.join(currAbsPath, pluginName)
    if (fs.existsSync(pluginAbsPath)) {
      console.log(`\nError: A plugin with name "${pluginName}" already exists here.\n`)
      return
    }

    fs.mkdirsSync(pluginAbsPath)

    fs.copySync(path.join(__dirname, '..', 'templates', 'PluginStructure'), path.join(currAbsPath, pluginName))
    fs.copySync(path.join(__dirname, '..', 'pylib'), path.join(currAbsPath, pluginName, 'pylib'))
    fs.copySync(path.join(__dirname, '..', 'main.py'), path.join(currAbsPath, pluginName, 'main.py'))
    fs.mkdirsSync(path.join(currAbsPath, pluginName, 'src', 'commands'))
    fs.mkdirsSync(path.join(currAbsPath, pluginName, 'src', 'listeners'))

    let pkg = JSON.parse(fs.readFileSync(path.join(currAbsPath, pluginName, 'package.json')).toString())
    pkg.dependencies["create-sublime-plugin-js"] = version
    fs.writeFileSync(path.join(currAbsPath, pluginName, 'package.json'), JSON.stringify(pkg, null, '\t'))

    fs.writeFileSync(path.join(currAbsPath, pluginName, pluginName + '.sublime-settings'), '{}')
    fs.writeFileSync(path.join(currAbsPath, pluginName, pluginName + '.gitignore'), '')

  })

commander
  .command('command <commandName>')
  .option('-t, --type [type]', 'Type of command: TextCommand, WindowCommand or ApplicationCommand', 'TextCommand')
  .action((commandName, options) => {

    if (!(/^\w+$/ig.test(commandName))) {
      console.log(`\nError: Invalid command name "${commandName}"\n`)
      return
    }

    let currAbsPath = path.resolve('.')

    try {
      fs.accessSync(path.join(currAbsPath, 'package.json'))
    } catch(e) {
      console.log(`\nError: package.json not found! Are you in the root folder of the plugin?\n`)
      return
    }

    let pkg = JSON.parse(fs.readFileSync(path.join(currAbsPath, 'package.json')).toString())
    if (version != pkg.dependencies["create-sublime-plugin-js"]) {
      console.log(`\nError: the version of "create-sublime-plugin-js" (${version}) is different from the one in the package.json file (${pkg.dependencies["create-sublime-plugin-js"]}).\n`)
      return
    }
    
    if (!fs.existsSync(path.join(currAbsPath, 'src', 'commands'))) {
      console.log(`\nError: Path ${path.join(currAbsPath, 'src', 'commands')} doesn't exists.\n`)
      return
    }

    commandName = commandName.trim().replace(/\s+/g, '_')
    let commandType = options.type
    if (commandType != 'TextCommand' && commandType != 'WindowCommand' && commandType != 'ApplicationCommand') {
      console.log(`\nError: Wrong command type "${commandType}"\n`)
      return
    }

    let jsCode = fs.readFileSync(path.join(__dirname, '..', 'templates', commandType, commandType + '.js')).toString()
    let dataToRender = {
      commandName
    }
    jsCode = mustache.render(jsCode, dataToRender)

    fs.writeFileSync(path.join(currAbsPath, 'src', 'commands', commandName + 'Command.js'), jsCode)

  })

commander
  .command('listener <listenerName>')
  .option('-t, --type [type]', 'Type of listener: EventListener or ViewEventListener', 'EventListener')
  .action((listenerName, options) => {

    if (!(/^\w+$/ig.test(listenerName))) {
      console.log(`\nError: Invalid listener name "${listenerName}"\n`)
      return
    }

    let currAbsPath = path.resolve('.')

    try {
      fs.accessSync(path.join(currAbsPath, 'package.json'))
    } catch(e) {
      console.log(`\nError: package.json not found! Are you in the root folder of the plugin?\n`)
      return
    }

    let pkg = JSON.parse(fs.readFileSync(path.join(currAbsPath, 'package.json')).toString())
    if (version != pkg.dependencies["create-sublime-plugin-js"]) {
      console.log(`\nError: the version of "create-sublime-plugin-js" (${version}) is different from the one in the package.json file (${pkg.dependencies["create-sublime-plugin-js"]}).\n`)
      return
    }
    
    if (!fs.existsSync(path.join(currAbsPath, 'src', 'listeners'))) {
      console.log(`\nError: Path ${path.join(currAbsPath, 'src', 'listeners')} doesn't exists.\n`)
      return
    }

    listenerName = listenerName.trim().replace(/\s+/g, '_')
    let listenerType = options.type
    if (listenerType != 'EventListener' && listenerType != 'ViewEventListener') {
      console.log(`\nError: Wrong listener type "${listenerType}"\n`)
      return
    }

    let jsCode = fs.readFileSync(path.join(__dirname, '..', 'templates', listenerType, listenerType + '.js')).toString()
    let dataToRender = {
      listenerName
    }
    jsCode = mustache.render(jsCode, dataToRender)

    fs.writeFileSync(path.join(currAbsPath, 'src', 'listeners', listenerName + 'Listener.js'), jsCode)

  })

commander
  .command('build')
  .action(() => {

    let currAbsPath = path.resolve('.')

    try {
      fs.accessSync(path.join(currAbsPath, 'package.json'))
    } catch(e) {
      console.log(`\nError: package.json not found! Are you in the root folder of the plugin?\n`)
      return
    }

    let pkg = JSON.parse(fs.readFileSync(path.join(currAbsPath, 'package.json')).toString())
    if (version != pkg.dependencies["create-sublime-plugin-js"]) {
      console.log(`\nError: the version of "create-sublime-plugin-js" (${version}) is different from the one in the package.json file (${pkg.dependencies["create-sublime-plugin-js"]}).\n`)
      return
    }

    fs.removeSync(path.join(currAbsPath, 'pysrc'))
    
    fs.mkdirsSync(path.join(currAbsPath, 'pysrc', 'commands'))
    fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'commands', '__init__.py'), '')
    fs.mkdirsSync(path.join(currAbsPath, 'pysrc', 'listeners'))
    fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'listeners', '__init__.py'), '')
    fs.writeFileSync(path.join(currAbsPath, 'pysrc', '__init__.py'), '')

    fs.copySync(path.join(__dirname, '..', 'templates', 'PluginStructure', 'server.js'), path.join(currAbsPath, 'server.js'))
    fs.copySync(path.join(__dirname, '..', 'pylib'), path.join(currAbsPath, 'pylib'))
    fs.copySync(path.join(__dirname, '..', 'main.py'), path.join(currAbsPath, 'main.py'))

    const entries = globby.sync([
      path.join(currAbsPath, 'src', 'commands', '**', '*Command.js'),
      path.join(currAbsPath, 'src', 'listeners', '**', '*Listener.js')
    ])

    let classes = []
    let commands = []
    let listeners = []

    for (let entry of entries) {
      // $Ignore
      let classOrClasses /*: Array | any*/ = require(entry)

      if (!(classOrClasses instanceof Array))
        classes.push(classOrClasses)
      else
        classes = [...classes, ...classOrClasses]
    }

    for (let c of classes) {
      let instance = new c()
      let methodsImplemented = []
      let parentClass = ''
      if (parentClass = isCommandParentClass(instance)) {
        let parentClassInstance = eval(`new ${parentClass}(null)`)
        let methods = getAllMethods(instance)
        for (let method of methods) {
          if (parentClassInstance[method] && instance[method].toString() != parentClassInstance[method].toString())
            methodsImplemented.push(method)
        }
        commands.push([instance.constructor.name, parentClass, methodsImplemented])
      }
      else if (parentClass = isListenerParentClass(instance)) {
        let parentClassInstance = eval(`new ${parentClass}(null)`)
        let methods = getAllMethods(instance)
        for (let method of methods) {
          if (parentClassInstance[method] && instance[method].toString() != parentClassInstance[method].toString())
            methodsImplemented.push(method)
        }
        listeners.push([instance.constructor.name, parentClass, methodsImplemented])
      }
    }

    let importCommandsFromPython = []
    let exportAllCommandsPython = []
    for (let command of commands) {
      let [commandName, commandType, methodsImplemented] = command
      commandName = commandName.replace(/Command$/, '')
      let pyCode = fs.readFileSync(path.join(__dirname, '..', 'templates', commandType, commandType + '.py')).toString()

      let dataToRender = {
        commandName
      }
      for (let methodImplemented of methodsImplemented)
        dataToRender[methodImplemented] = true
      pyCode = mustache.render(pyCode, dataToRender)

      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'commands', commandName + 'Command.py'), pyCode)

      importCommandsFromPython.push(`from .${commandName}Command import ${commandName}Command`)
      exportAllCommandsPython.push(`"${commandName}Command"`)
    }

    if (importCommandsFromPython.length > 0)
      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'commands', '__init__.py'), `${importCommandsFromPython.join("\n")}\n\n__all__ = [${exportAllCommandsPython.join(",")}]`)

    let importListenersFromPython = []
    let exportAllListenersPython = []
    for (let listener of listeners) {
      let [listenerName, listenerType, methodsImplemented] = listener
      listenerName = listenerName.replace(/Listener$/, '')
      let pyCode = fs.readFileSync(path.join(__dirname, '..', 'templates', listenerType, listenerType + '.py')).toString()

      let dataToRender = {
        listenerName
      }
      for (let methodImplemented of methodsImplemented)
        dataToRender[methodImplemented] = true
      pyCode = mustache.render(pyCode, dataToRender)

      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'listeners', listenerName + 'Listener.py'), pyCode)

      importListenersFromPython.push(`from .${listenerName}Listener import ${listenerName}Listener`)
      exportAllListenersPython.push(`"${listenerName}Listener"`)
    }

    if (importListenersFromPython.length > 0)
      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'listeners', '__init__.py'), `${importListenersFromPython.join("\n")}\n\n__all__ = [${exportAllListenersPython.join(",")}]`)

  })

commander.parse(process.argv)