import { useEffect, useState, useCallback } from 'react'

export default (promiseCreator, { autoLoad = true } = {}) => {
  const [lastTrigger, setLastTrigger] = useState(0)
  const [status, setStatus] = useState('ready')
  const [result, setResult] = useState()

  const trigger = useCallback(() => {
    setLastTrigger(Date.now())
  }, [])

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

    if (autoLoad || lastTrigger !== 0) {
      openPromise()
    }

    return () => {
      unmounted = true
    }
  }, [lastTrigger])

  return [result, status, trigger]
}
