import postcss from 'postcss'
import postcssModular from 'postcss-modular'
import cssnano from 'cssnano'

module.exports = function processCSS(css, options, map) {
  let inputMap = map
  if (options.sourceMap) {
    if (map) {
      if (typeof map === 'string') {
        inputMap = JSON.stringify(map)
      }

      if (map.sources) {
        inputMap.sources = map.sources.map(source => source.replace(/\\/g, '/'))
        inputMap.sourceRoot = ''
      }
    }
  } else {
    inputMap = null
  }

  const pipeline = postcss([postcssModular(options)])

  if (options.minimize) {
    const minimizeOptions = Object.assign({}, options.minimize);
    [
      'zindex',
      'normalizeUrl',
      'discardUnused',
      'mergeIdents',
      'reduceIdents',
      'autoprefixer'
    ].forEach((name) => {
      if (typeof minimizeOptions[name] === 'undefined') {
        minimizeOptions[name] = false
      }
    })
    pipeline.use(cssnano(minimizeOptions))
  }

  return pipeline.process(css, {
    // we need a prefix to avoid path rewriting of PostCSS
    to: options.to,
    from: options.from,
    map: options.sourceMap ? {
      prev: inputMap,
      sourcesContent: true,
      inline: false,
      annotation: false
    } : null
  })
}
