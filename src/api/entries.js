/* globals firebase */

import { mapGet, mapCreate, mapUpdate } from 'models/entry'
import { getCategories, addCategory } from 'api/categories'

export const getAllEntries = (interval) => new Promise((resolve, reject) => {
  const db = firebase.firestore()

  if (!firebase.auth().currentUser) {
    resolve([])
  }

  const uid = firebase.auth().currentUser.uid

  const firstDate = interval.firstDate
  const lastDate = interval.lastDate

  db.collection('entries')
    .where('userId', '==', uid)
    .where('active', '==', true)
    .where('date', '>=', firstDate)
    .where('date', '<=', lastDate)
    .get()
    .then(snap => {
      const entries = []

      snap.forEach(doc => {
        entries.push(mapGet(doc))
      })

      entries.sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else if (a.date > b.date) {
          return -1
        } else {
          return 0
        }
      })

      resolve(entries)
    })
    .catch(err => {
      console.error(err)
      reject(err)
    })
})

const assertCategory = (data) => {
  return getCategories()
    .then(categories => {
      if (!categories.find(cat => cat.label === data.category)) {
        return addCategory({ label: data.category })
      }
    })
}

export const addEntry = (form) => {
  const data = mapCreate(form)

  const db = firebase.firestore()
  return assertCategory(data)
    .then(() => db.collection('entries').add(data))
}

export const saveEntry = ({ id, ...form }) => {
  const data = mapUpdate(form)

  const db = firebase.firestore()
  return assertCategory(data)
    .then(() => db.collection('entries').doc(id).update(data))
}

export const deleteEntry = (id) => {
  const db = firebase.firestore()
  return db.collection('entries').doc(id).update({
    active: false
  })
}
