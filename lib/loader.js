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
      store: globalStore,
      sourceMap: query.sourceMap || false,
      // As webpack imports in not standart sort
      useNonImported: true
    }),
    map
  )
    .then((result) => {
      callback(
        null,
        [
          'exports = module.exports = [];',
          `exports.push([module.i, "${result.css
            .replace(/\n/g, '\\n')
            .replace(/"/g, '\\"')}"${result.map ? `, "${result.map}"` : ''}]);`,
          `exports.locals = ${JSON.stringify(result.translations)};`
        ].join('\n')
      )
    }).catch(callback)
}
