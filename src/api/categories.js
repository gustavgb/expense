/* globals firebase */

import { mapGet, mapCreate, mapUpdate } from 'models/category'
import { clearCache, setCache, getCache } from 'utils/cache'

export const getCategories = () => new Promise((resolve, reject) => {
  if (!firebase.auth().currentUser) {
    resolve([])
    return
  }
  const userId = firebase.auth().currentUser.uid

  if (getCache('categories')) {
    resolve(getCache('categories'))
  }

  firebase.firestore().collection('categories')
    .where('userId', '==', userId)
    .get()
    .then(snap => {
      const categories = []

      snap.forEach(doc => {
        categories.push(mapGet(doc))
      })

      setCache('categories', categories)

      resolve(categories)
    })
    .catch(reject)
})

export const addCategory = (form) => {
  const data = mapCreate(form)

  clearCache('categories')

  return firebase.firestore().collection('categories').add(data)
}

export const updateCategory = ({ id, ...form }) => {
  const data = mapUpdate(form)

  clearCache('categories')

  return firebase.firestore().collection('categories').doc(id).update(data)
}
