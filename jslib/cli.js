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
    fs.copySync(path.join(__dirname, '..', 'index.js'), path.join(currAbsPath, pluginName, 'index.js'))

    fs.writeFileSync(path.join(currAbsPath, pluginName, pluginName + '.sublime-settings'), '{}')

  })

commander
  .command('update')
  .action(() => {
    
    let pluginAbsPath = path.resolve('.')

    fs.copySync(path.join(__dirname, '..', 'pylib'), path.join(pluginAbsPath, 'pylib'))
    fs.copySync(path.join(__dirname, '..', 'main.py'), path.join(pluginAbsPath, 'main.py'))
    fs.copySync(path.join(__dirname, '..', 'index.js'), path.join(pluginAbsPath, 'index.js'))

  })

commander
  .command('command <commandName>')
  .option('-t, --type [type]', 'Type of command: TextCommand, WindowCommand or ApplicationCommand', 'TextCommand')
  .action((commandName, options) => {

    if (!fs.existsSync(path.join('src', 'commands'))) {
      console.log(`Error: Path ${path.join('src', 'commands')} doesn't exists.`)
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

    fs.writeFileSync(path.join('src', 'commands', commandName + 'Command.js'), jsCode)
    fs.writeFileSync(path.join('src', 'commands', commandName + 'Command.py'), pyCode)

  })

commander.parse(process.argv)