import PropTypes from 'prop-types'

export const mapGet = (data, doc) => ({
  ...data,
  id: doc.id
})

export const mapCreate = (form) => ({
  date: new Date(form.date).toISOString(),
  description: form.description,
  amount: parseInt(form.amount, 10),
  tags: form.tags
})

export const entryPropType = PropTypes.object
