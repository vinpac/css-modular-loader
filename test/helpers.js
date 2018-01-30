import cssModularLoader from '../lib/loader'

export function runLoader(loader, input, map, options, callback) {
  loader.call(
    {
      callback,
      async: () => callback,
      options: Object.assign(
        {
          resolve: {
            alias: {
              Components: '/home/Components',
            },
          },
          context: '',
        },
        options,
      ),
      loaders: [{ request: '/path/css-loader' }],
      loaderIndex: 0,
      context: '',
      resource: 'test.css',
      resourcePath: 'test.css',
      request: 'css-loader!test.css',
      emitError: message => {
        throw new Error(message)
      },
    },
    input,
    map,
  )
}

export function parse(input, map, options) {
  return new Promise((resolve, reject) => {
    runLoader(cssModularLoader, input, map, options, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
