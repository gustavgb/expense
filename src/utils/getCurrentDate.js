export default () => {
  const now = new Date()

  return new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
}
