import { useState, useEffect } from 'react'
import { getState, setState, subscribe, unsubscribe } from 'utils/globalState'

let counter = 0

export default (key, options) => {
  const [value, setValue] = useState(getState(key))

  useEffect(() => {
    const name = counter++
    subscribe(name, (state) => setValue(state[key]))

    return () => {
      unsubscribe(name)
    }
  }, [])

  return [
    value,
    (newValue) => setState(key, newValue, options)
  ]
}
