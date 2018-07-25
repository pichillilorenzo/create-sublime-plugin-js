#!/usr/bin/env node

// @flow

const commander = require('commander'),
  packageJson = require('../package.json'),
  version = packageJson.version,
  fs = require('fs-extra'),
  path = require('path')

commander
  .version(version)

commander
  .command('init <pluginName>')
  .action((pluginName) => {

    let currAbsPath = path.resolve('.')
    
    pluginName = pluginName.trim()

    let pluginAbsPath = path.join(currAbsPath, pluginName)
    if (fs.existsSync(pluginAbsPath)) {
      console.log(`A plugin with name "${pluginName}" already exists here.`)
      return
    }

    fs.mkdirsSync(pluginAbsPath)

    fs.copySync(path.join(__dirname, '..', 'templates', 'PluginStructure'), path.join(currAbsPath, pluginName))
    fs.copySync(path.join(__dirname, '..', 'pylib'), path.join(currAbsPath, pluginName, 'pylib'))
    fs.copySync(path.join(__dirname, '..', 'main.py'), path.join(currAbsPath, pluginName, 'main.py'))

    fs.writeFileSync(path.join(currAbsPath, pluginName, pluginName + '.sublime-settings'), '{}')

  })

commander
  .command('update')
  .action(() => {
    
    let currAbsPath = path.resolve('.')

    try {
      fs.accessSync(path.join(currAbsPath, 'package.json'))
    } catch(e) {
      console.log(`\npackage.json not found! Are you in the root folder of the plugin?\n`)
      return
    }
    
    fs.copySync(path.join(__dirname, '..', 'pylib'), path.join(currAbsPath, 'pylib'))
    fs.copySync(path.join(__dirname, '..', 'main.py'), path.join(currAbsPath, 'main.py'))

    const dirs = fs.readdirSync(path.join(currAbsPath, 'src', 'commands'))
    let importFromPython = []
    let exportAllPython = []
    for (let dirname of dirs) {
      if (!fs.statSync(path.join(currAbsPath, 'src', 'commands', dirname)).isDirectory() || !dirname.endsWith('Command'))
        continue
      importFromPython.push(`from .${dirname}.${dirname} import ${dirname}`)
      exportAllPython.push(`"${dirname}"`)
    }

    fs.writeFileSync(path.join('src', 'commands', '__init__.py'), `${importFromPython.join("\n")}\n\n__all__ = [${exportAllPython.join(",")}]`)

  })

commander
  .command('command <commandName>')
  .option('-t, --type [type]', 'Type of command: TextCommand, WindowCommand or ApplicationCommand', 'TextCommand')
  .action((commandName, options) => {

    let currAbsPath = path.resolve('.')

    try {
      fs.accessSync(path.join(currAbsPath, 'package.json'))
    } catch(e) {
      console.log(`\npackage.json not found! Are you in the root folder of the plugin?\n`)
      return
    }
    
    if (!fs.existsSync(path.join(currAbsPath, 'src', 'commands'))) {
      console.log(`Error: Path ${path.join(currAbsPath, 'src', 'commands')} doesn't exists.`)
      return
    }

    commandName = commandName.trim().replace(/\s+/g, '_')
    let commandType = options.type
    if (commandType != 'TextCommand' && commandType != 'WindowCommand' && commandType != 'ApplicationCommand') {
      console.log('Wrong command type: ' + commandType)
      return
    }

    let jsCode = fs.readFileSync(path.join(__dirname, '..', 'templates', commandType, commandType + '.js')).toString().replace(/\$commandName/g, commandName)
    let pyCode = fs.readFileSync(path.join(__dirname, '..', 'templates', commandType, commandType + '.py')).toString().replace(/\$commandName/g, commandName)

    fs.mkdirsSync(path.join(currAbsPath, 'src', 'commands', commandName + 'Command'))

    fs.writeFileSync(path.join(currAbsPath, 'src', 'commands', commandName + 'Command', commandName + 'Command.js'), jsCode)
    fs.writeFileSync(path.join(currAbsPath, 'src', 'commands', commandName + 'Command', commandName + 'Command.py'), pyCode)
    fs.writeFileSync(path.join(currAbsPath, 'src', 'commands', commandName + 'Command', '__init__.py'), '')

    const dirs = fs.readdirSync(path.join(currAbsPath, 'src', 'commands'))
    let importFromPython = []
    let exportAllPython = []
    for (let dirname of dirs) {
      if (!fs.statSync(path.join(currAbsPath, 'src', 'commands', dirname)).isDirectory() || !dirname.endsWith('Command'))
        continue
      importFromPython.push(`from .${dirname}.${dirname} import ${dirname}`)
      exportAllPython.push(`"${dirname}"`)
    }

    fs.writeFileSync(path.join('src', 'commands', '__init__.py'), `${importFromPython.join("\n")}\n\n__all__ = [${exportAllPython.join(",")}]`)

  })

commander.parse(process.argv)