export const mapGet = (doc) => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id
  }
}
