import { useState, useCallback } from 'react'

export default (initialFields, createSubmitPromise) => {
  const [form, setForm] = useState(initialFields || {})
  const [status, setStatus] = useState('ready')

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
    },
    [setForm]
  )

  const submit = useCallback(
    async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault()
      }

      setStatus('loading')

      try {
        await createSubmitPromise(form)

        setStatus('success')
      } catch (err) {
        console.error(err)
        return setStatus('failed')
      }
    },
    [form, createSubmitPromise]
  )

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
