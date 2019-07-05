/* globals firebase */

import { mapGet, mapCreate } from 'models/entry'

export const getAllEntries = () => new Promise((resolve, reject) => {
  const db = firebase.firestore()

  db.collection('entries')
    .orderBy('date', 'desc')
    .get()
    .then(snap => {
      const entries = []

      snap.forEach(doc => {
        entries.push(mapGet(doc.data(), doc))
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
