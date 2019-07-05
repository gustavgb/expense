import { useEffect, useState, useCallback } from 'react'

export default (promiseCreator) => {
  let [initialTrigger, setInitialTrigger] = useState(0)

  if (initialTrigger === 0) {
    initialTrigger = Date.now()
    setInitialTrigger(initialTrigger)
  }

  const [lastTrigger, setLastTrigger] = useState(initialTrigger)
  const [status, setStatus] = useState('ready')
  const [result, setResult] = useState()

  const trigger = useCallback(() => {
    setLastTrigger(Date.now())
  })

  useEffect(() => {
    let unmounted = false

    const openPromise = async () => {
      setStatus('pending')

      try {
        const result = await promiseCreator()

        if (!unmounted) {
          setResult(result)
          setStatus('success')
        }
      } catch (e) {
        console.error(e)
        if (!unmounted) {
          setStatus('failed')
        }
      }
    }

    openPromise()

    return () => {
      unmounted = true
    }
  }, [lastTrigger])

  return [result, status, trigger]
}
