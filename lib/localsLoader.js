import loaderUtils from 'loader-utils'
import processCSS from './processCSS'

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
      sourceMap: query.sourceMap || false,
      // As webpack imports in not standart sort
      useNoImported: true
    }),
    map
  )
    .then(result => {
      callback(null, `module.exports = ${JSON.stringify(result.translations)};`)
    })
    .catch(callback)
}
