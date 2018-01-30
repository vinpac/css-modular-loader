import loaderUtils from 'loader-utils'
import processCSS from './processCSS'
import createPathResolver from './createPathResolver'

const globalStore = {}
module.exports = function cssLoader(css, map) {
  if (this.cacheable) {
    this.cacheable()
  }

  const callback = this.async()
  const query = loaderUtils.getOptions(this) || {}

  processCSS(
    css,
    Object.assign({}, query, {
      from: `/css-loader/${loaderUtils
        .getRemainingRequest(this)
        .split('!')
        .pop()}`,
      to: loaderUtils
        .getRemainingRequest(this)
        .split('!')
        .pop(),
      url: true,
      store: globalStore,
      extension: query.extension || '.css',
      sourceMap: query.sourceMap || false,
      resolvePath: createPathResolver(this),
      // As webpack imports in not standart sort
      useNoImported: 'ignore',
    }),
    map,
    this,
  )
    .then(result => {
      callback(
        null,
        [
          'exports = module.exports = [];',
          // eslint-disable-next-line max-len
          `exports.push([module.i, ${result.cssJS}${result.map
            ? `, ${JSON.stringify(result.map)}`
            : ''}]);`,
          `exports.locals = ${JSON.stringify(result.translations)};`,
        ].join('\n'),
      )
    })
    .catch(callback)
}
