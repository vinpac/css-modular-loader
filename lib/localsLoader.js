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
  const fromValue = `/css-loader/${loaderUtils
    .getRemainingRequest(this)
    .split('!')
    .pop()}`

  processCSS(
    css,
    Object.assign({}, query, {
      from: fromValue,
      to: loaderUtils
        .getRemainingRequest(this)
        .split('!')
        .pop(),
      url: true,
      store: globalStore,
      extension: query.extension || '.css',
      sourceMap: query.sourceMap || false,
      resolvePath: createPathResolver(this, fromValue),
      // As webpack imports in not standart sort
      useNoImported: 'ignore',
    }),
    map,
    this,
  )
    .then(result => {
      callback(null, `module.exports = ${JSON.stringify(result.translations)};`)
    })
    .catch(callback)
}
