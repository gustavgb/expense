/* globals firebase */

import { mapGet } from 'models/category'

export const getCategories = () => new Promise((resolve, reject) => {
  if (!firebase.auth().currentUser) {
    resolve([])
    return
  }
  const userId = firebase.auth().currentUser.uid

  firebase.firestore().collection('categories')
    .where('userId', '==', userId)
    .get()
    .then(snap => {
      const categories = []

      snap.forEach(doc => {
        categories.push(mapGet(doc))
      })

      resolve(categories)
    })
    .catch(reject)
})
