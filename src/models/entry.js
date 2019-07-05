/* globals firebase */

import PropTypes from 'prop-types'

export const mapGet = (data, doc) => ({
  description: '',
  amount: '',
  date: new Date().toISOString(),
  tags: [],
  active: true,
  userId: '',
  ...data,
  id: doc.id
})

export const mapCreate = (form) => ({
  date: new Date(form.date).toISOString(),
  description: form.description,
  amount: parseInt(form.amount, 10),
  tags: form.tags,
  userId: firebase.auth().currentUser.uid,
  active: true
})

export const entryPropType = PropTypes.object
