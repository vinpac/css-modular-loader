import { parse } from './helpers'

describe('Loader', () => {
  it('should work', async () => {
    await parse('.home-asd {\n\tcolor: #333;\n}\n', null, { sourceMap: true })
      .then(result => expect(result).toEqual(`
exports = module.exports = [];
exports.push([module.i, "._home-asd_16pq3_1 {\\n\\tcolor: #333;\\n}\\n"]);
exports.locals = {"home-asd":"_home-asd_16pq3_1"};`.trim()))
  })
})
