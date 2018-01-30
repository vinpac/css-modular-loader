import { parse } from './helpers'

describe('Loader', () => {
  it('should work', async () => {
    await parse(
      ':import { a: \'Fix/test\'; } .home-asd {\n\tcolor: #333; background: url(\'./image.png\');\n}\n',
      null,
      { sourceMap: true },
    ).then(result => expect(result).toEqual(`
exports = module.exports = [];
exports.push([module.i, "._home-asd_jtjz7_9 {\\n\\tcolor: #333; background: url(" + require("./image.png") + ");\\n}\\n"]);
exports.locals = {"home-asd":"_home-asd_jtjz7_9"};`.trim()))
  })
})
