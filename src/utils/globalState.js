let globalState = {}
let persistedStorage = {}
const subscribers = []

export const subscribe = (name, callback) => {
  subscribers.push({ name, callback })
}

export const unsubscribe = (name) => {
  delete subscribers[name]
}

export const setState = window.setState = (key, value, { persist = true } = {}) => {
  if (value === undefined) {
    throw new Error('Value cannot be undefined.')
  }

  if (persist) {
    persistedStorage[key] = value
    localStorage.setItem('globalState', JSON.stringify(persistedStorage))
  }

  globalState[key] = value

  subscribers.forEach(({ callback }) => {
    callback(globalState)
  })
}

export const getState = (key) => {
  return globalState[key]
}

window.addEventListener('load', () => {
  try {
    const saved = JSON.parse(localStorage.getItem('globalState'))
    persistedStorage = { ...saved }
    globalState = { ...saved }
  } catch (e) {
    console.log('No global state saved')
  }
})

window.getState = () => globalState
