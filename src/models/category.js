/* globals firebase */

export const mapGet = (doc) => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id
  }
}

export const mapCreate = (form) => ({
  label: form.label,
  userId: firebase.auth().currentUser.uid
})

export const mapUpdate = (form) => ({
  label: form.label
})
