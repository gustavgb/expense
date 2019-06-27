import { useState, useEffect } from 'react'
import { getState, setState, subscribe, unsubscribe } from 'utils/globalState'

let counter = 0

export default (key) => {
  let [initialValue, setInitialValue] = useState(undefined)

  if (getState(key) !== undefined && initialValue === undefined) {
    initialValue = getState(key)
    setInitialValue(initialValue)
  }

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const name = counter++
    subscribe(name, (state) => setValue(state[key]))

    return () => {
      unsubscribe(name)
    }
  }, [])

  return [
    value,
    (newValue) => setState(key, newValue)
  ]
}
