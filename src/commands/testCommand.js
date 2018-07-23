// @flow

const TextCommand = require('../../jslib/TextCommand.js'),
      sublime = require('../../jslib/sublime.js')

class testCommand extends TextCommand {

  async run (edit, args, step) {
    // console.log(args)
    // console.log(this)

    let view = await this.view(step)
    let sel = await view.sel()
    let phantom = await sublime.Phantom(await sel.get(0, step), 'content <a href="asd">fgg</a>', sublime.LAYOUT_INLINE, (href) => {
      console.log(href)
    })

    let phantom_set = await sublime.PhantomSet(view, 'phantomTestKey')
    await phantom_set.update([phantom], step)

    sublime.set_timeout_async(async (subStep) => {
      await phantom_set.update([])
    }, 2000)

    // console.log(await sel.get(0, step))

    // console.log(await sel.length(step))

    // await view.show_popup("test <a href=\"yeah\">yeah</a>", 0, -1, 300, 400, 
    //   async (href, step2) => {
    //     console.log(href)
    //     await view.update_popup("another test <a href=\"test\">test</a>", step2)
    //     console.log(await view.is_popup_visible())
    //   }, async (step2) => {
    //     console.log("hide")
    //   }, step)

    // console.log(await view.style(step))
    // console.log(await view.style_for_scope("script.js", step))
    // console.log(await (await view.symbols(step))[0][0].begin())
    // await view.run_command('test2', null, step)
    // console.log(view)

    // let region = await sublime.Region(40, 90)
    // console.log(await (await region.cover(await sel.get(0, step))).begin())
    // console.log(await (await region.intersection(await sublime.Region(70, 80))).begin())
    // console.log(await region.intersects(await sublime.Region(30, 50)))
    // console.log(await region.contains(await sublime.Region(70, 80)))

    // sublime.set_timeout(async (cbStep) => {
    //   await region.a(4)
    //   let result2 = await view.substr(region, cbStep)
    //   console.log(result2)
    // }, 3000)

    // await region.a(2)

    // var result = await view.insert(edit, 0, 'asd', step)
    // console.log(result)

    // result = await view.is_dirty(step)

    // sublime.set_timeout_async(async (cbStep) => {
    //   result = await view.substr(region, cbStep)
    //   console.log("a1")
    //   console.log(result)

    //   sublime.set_timeout_async(async (cbStep) => {
    //     result = await view.set_scratch(true, cbStep)
    //     console.log("a2")
    //     console.log(result)
    //     sublime.set_timeout_async(async (cbStep) => {
    //       result = await view.is_dirty(cbStep)
    //       console.log("a3")
    //       console.log(result)
    //     }, 0)
    //   }, 0)
    // }, 100)


    // let result = await view.substr(region, step)
    // console.log(result)

    // result = await sublime.Region(0,34)
    // console.log(result)
    // console.log(await result.a())
    // await result.a(5)
    // await result.b(10)
    // console.log(result)
    // console.log(await result.size())
    // console.log(await result.empty())

    //await this.freeMemory(step)

  }

  async is_enabled (args, step) {
    let view = await this.view(step)
    let sel_begin = await (await (await view.sel(step)).get(0, step)).begin(step)

    return await view.match_selector(
        sel_begin,
        'source.js',
        step
      ) || await view.match_selector(
        sel_begin,
        'source.js.embedded.html',
        step
      )
  }

  // async is_visible (args, step) {
  //   let view = await this.view(step)
  //   let sel_begin = await (await (await view.sel(step)).get(0, step)).begin(step)

  //   return await view.match_selector(
  //       sel_begin,
  //       'source.js',
  //       step
  //     ) || await view.match_selector(
  //       sel_begin,
  //       'source.js.embedded.html',
  //       step
  //     )
  // }

}

module.exports = new testCommand()