import { useState, useCallback, useEffect } from 'react'

let counter = 0
const unmounted = {}

export default (initialFields = {}, createSubmitPromise) => {
  const [form, setForm] = useState(initialFields)
  const [status, setStatus] = useState('ready')
  const [id] = useState(counter + 1)

  const setField = useCallback(
    (key, value) => {
      setForm({
        ...form,
        [key]: value
      })
    },
    [setForm, form]
  )

  const resetForm = useCallback(
    () => {
      setForm(initialFields)
      setStatus('ready')
    },
    [setForm, setStatus, initialFields]
  )

  const submit = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault()
      }

      setStatus('pending')

      createSubmitPromise(form)
        .then((cleanupFunc) => {
          if (!unmounted[id]) {
            setStatus('success')
          }
          if (typeof cleanupFunc === 'function') {
            cleanupFunc()
          }
        })
        .catch(err => {
          console.error(err)
          if (!unmounted[id]) {
            setStatus('failed')
          }
        })
    },
    [form, createSubmitPromise]
  )

  useEffect(() => {
    counter++

    return () => {
      unmounted[id] = true
    }
  }, [])

  return [
    {
      ...form,
      status
    },
    {
      setField,
      resetForm,
      submit
    }
  ]
}
