/* globals firebase */

import PropTypes from 'prop-types'
import { stringToColor } from 'utils/color'

export const mapGet = (doc) => {
  const data = doc.data()
  return {
    description: '',
    amount: '',
    date: new Date().toISOString(),
    category: '',
    active: true,
    userId: '',
    ...data,
    id: doc.id,
    categoryColor: data.category ? stringToColor(data.category) : '#bdbdbd'
  }
}

export const mapCreate = (form) => ({
  date: new Date(form.date).toISOString(),
  description: form.description,
  amount: parseInt(form.type === 'expense' ? -Math.abs(form.amount) : Math.abs(form.amount), 10),
  category: form.category,
  userId: firebase.auth().currentUser.uid,
  active: true
})

export const mapUpdate = (form) => ({
  date: new Date(form.date).toISOString(),
  description: form.description,
  amount: parseInt(form.type === 'expense' ? -Math.abs(form.amount) : Math.abs(form.amount), 10),
  category: form.category,
  active: form.active
})

export const entryPropType = PropTypes.object
