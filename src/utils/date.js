const padZero = (n) => n < 10 ? `0${n}` : n

export const getCurrentInterval = window.test = (offset) => {
  const now = new Date()

  const year = now.getFullYear() + Math.floor((now.getMonth() + offset) / 12)
  const month = (now.getMonth() + offset + Math.abs(Math.floor(offset / 12)) * 12) % 12 + 1

  const firstDate = new Date(`${year}-${padZero(month)}-01`).getDate()
  const lastDate = new Date(new Date(`${year}-${padZero(month + 1)}-01`).getTime() - 86400000).getDate()

  return {
    year,
    month,
    firstDate: `${year}-${padZero(month)}-${padZero(firstDate)}`,
    lastDate: `${year}-${padZero(month)}-${padZero(lastDate)}`
  }
}

export const getCurrentDate = () => {
  const now = new Date()

  return new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
}
