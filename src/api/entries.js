/* globals firebase */

import { mapGet, mapCreate, mapUpdate } from 'models/entry'

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
        entries.push(mapGet(doc.data(), doc))
      })

      entries.sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else if (a.date > b.data) {
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

export const addEntry = (form) => {
  const data = mapCreate(form)

  const db = firebase.firestore()
  return db.collection('entries').add(data)
}

export const saveEntry = ({ id, ...form }) => {
  const data = mapUpdate(form)

  const db = firebase.firestore()
  return db.collection('entries').doc(id).update(data)
}

export const deleteEntry = (id) => {
  const db = firebase.firestore()
  return db.collection('entries').doc(id).update({
    active: false
  })
}
