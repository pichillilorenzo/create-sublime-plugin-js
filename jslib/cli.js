#!/usr/bin/env node

// @flow

const commander = require('commander'),
  packageJson = require('../package.json'),
  version = packageJson.version,
  fs = require('fs-extra'),
  path = require('path'),
  globby = require('globby')

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

    fs.mkdirsSync(path.join(currAbsPath, 'pysrc', 'commands'))
    fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'commands', '__init__.py'), '')
    fs.mkdirsSync(path.join(currAbsPath, 'pysrc', 'listeners'))
    fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'listeners', '__init__.py'), '')
    fs.writeFileSync(path.join(currAbsPath, 'pysrc', '__init__.py'), '')

    fs.copySync(path.join(__dirname, '..', 'templates', 'PluginStructure'), path.join(currAbsPath, pluginName))
    fs.copySync(path.join(__dirname, '..', 'pylib'), path.join(currAbsPath, pluginName, 'pylib'))
    fs.copySync(path.join(__dirname, '..', 'main.py'), path.join(currAbsPath, pluginName, 'main.py'))

    fs.writeFileSync(path.join(currAbsPath, pluginName, pluginName + '.sublime-settings'), '{}')

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

    let jsCode = fs.readFileSync(path.join(__dirname, '..', 'templates', commandType, commandType + '.js')).toString().replace(/\$commandName/g, commandName)

    fs.mkdirsSync(path.join(currAbsPath, 'src', 'commands', commandName + 'Command'))
    fs.writeFileSync(path.join(currAbsPath, 'src', 'commands', commandName + 'Command.js'), jsCode)

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
      let extendsClassName = Object.getPrototypeOf(Object.getPrototypeOf(instance)).constructor.name
      if (extendsClassName.endsWith('Command'))
        commands.push([instance.constructor.name, extendsClassName])
      else if (extendsClassName.endsWith('Listener'))
        listeners.push([instance.constructor.name, extendsClassName])
    }

    let importCommandsFromPython = []
    let exportAllCommandsPython = []
    for (let command of commands) {
      let [commandName, commandType] = command
      commandName = commandName.replace(/Command$/, '')
      let pyCode = fs.readFileSync(path.join(__dirname, '..', 'templates', commandType, commandType + '.py')).toString().replace(/\$commandName/g, commandName)
      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'commands', commandName + 'Command.py'), pyCode)

      importCommandsFromPython.push(`from .${commandName}Command import ${commandName}Command`)
      exportAllCommandsPython.push(`"${commandName}Command"`)
    }

    if (importCommandsFromPython.length > 0)
      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'commands', '__init__.py'), `${importCommandsFromPython.join("\n")}\n\n__all__ = [${exportAllCommandsPython.join(",")}]`)

    let importListenersFromPython = []
    let exportAllListenersPython = []
    for (let listener of listeners) {
      let [listenerName, listenerType] = listener
      listenerName = listenerName.replace(/Listener$/, '')
      let pyCode = fs.readFileSync(path.join(__dirname, '..', 'templates', listenerType, listenerType + '.py')).toString().replace(/\$listenerName/g, listenerName)
      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'listeners', listenerName + 'Listener.py'), pyCode)

      importListenersFromPython.push(`from .${listenerName}Listener import ${listenerName}Listener`)
      exportAllListenersPython.push(`"${listenerName}Listener"`)
    }

    if (importListenersFromPython.length > 0)
      fs.writeFileSync(path.join(currAbsPath, 'pysrc', 'listeners', '__init__.py'), `${importListenersFromPython.join("\n")}\n\n__all__ = [${exportAllListenersPython.join(",")}]`)

  })

commander.parse(process.argv)