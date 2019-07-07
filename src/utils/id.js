export const createId = window.createId = (names = []) => {
  return names.join('').toLowerCase().replace(/\s/g, '').replace(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g, '')
}
