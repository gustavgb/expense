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
    const openPromise = async () => {
      setStatus('pending')

      try {
        const result = await promiseCreator()

        setResult(result)
        setStatus('success')
      } catch (e) {
        console.error(e)
        setStatus('failed')
      }
    }

    openPromise()
  }, [lastTrigger])

  return [result, status, trigger]
}
