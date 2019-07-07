let cache = {}

export const setCache = (key, content) => {
  cache[key] = content
}

export const getCache = (key) => cache[key]

export const clearCache = (key) => {
  if (key) {
    delete cache[key]
  } else {
    cache = {}
  }
}
