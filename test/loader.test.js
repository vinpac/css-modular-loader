import { parse } from './helpers'

describe('Loader', () => {
  it('should work', async () => {
    await parse(
      '@use .c as .a from \'./a\'; .home-asd {\n\tcolor: #333; background: url(\'./image.png\');\n}\n',
      null,
      { sourceMap: true },
    ).then(result => expect(result).toEqual(`
exports = module.exports = [];
exports.push([module.i, "._home-asd_1wtsu_1 {\\n\\tcolor: #333; background: url(" + require("./image.png") + ");\\n}\\n"]);
exports.locals = {"a":"_c_1wtsu_1","home-asd":"_home-asd_1wtsu_1"};`.trim()))
  })
})
