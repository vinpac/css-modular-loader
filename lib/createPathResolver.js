import path from 'path'

export default function createPathResolver(context, request) {
  return moduleRequest => {
    const aliasArr = []
    try {
      const { alias } = context.options.resolve
      Object.keys(alias).forEach(key => {
        aliasArr.push({
          regex: new RegExp(/\^|\$/g.test(key) ? key : `^${key}`),
          path: alias[key],
        })
      })
    } catch (error) {
      // ...
    }

    const aliasMatch = aliasArr.find(aliasItem => aliasItem.regex.test(moduleRequest))
    if (aliasMatch) {
      return `/css-loader${moduleRequest.replace(aliasMatch.regex, aliasMatch.path)}`
    }

    return path.resolve(path.dirname(request), moduleRequest)
  }
}
