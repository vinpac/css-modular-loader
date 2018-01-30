import path from 'path'

export default function createPathResolver(context) {
  const a = moduleRequest => {
    const splitedRequest = context.request.split('!')
    const filepath = splitedRequest.pop()
    const aliasArr = []
    try {
      const { alias } = context.options.resolve
      Object.keys(alias).forEach(key => {
        aliasArr.push({
          regex: new RegExp(/[^$]/g.test(key) ? key : `^${key}`),
          path: alias[key],
        })
      })
    } catch (error) {
      // ...
    }

    const aliasMatch = aliasArr.find(aliasItem => aliasItem.regex.test(moduleRequest))
    if (aliasMatch) {
      splitedRequest.push(moduleRequest.replace(aliasMatch.regex, aliasMatch.path))
      return splitedRequest.join('!')
    }

    return path.resolve(filepath, moduleRequest)
  }

  return args => {
    const b = a(args)
    return b
  }
}
