const globalState = {}
const subscribers = []

export const subscribe = (name, callback) => {
  subscribers.push({ name, callback })
}

export const unsubscribe = (name) => {
  delete subscribers[name]
}

export const setState = global.setState = (key, value) => {
  if (value === undefined) {
    throw new Error('Value cannot be undefined.')
  }

  globalState[key] = value

  subscribers.forEach(({ callback }) => {
    callback(globalState)
  })
}

export const getState = (key) => {
  return globalState[key]
}

global.getState = () => globalState
