import dateformat from 'dateformat'

const padZero = (n) => n < 10 ? `0${n}` : n

export const getCurrentInterval = (offset) => {
  const now = new Date()

  const year = now.getFullYear() + Math.floor((now.getMonth() + offset) / 12)
  const month = (now.getMonth() + offset + Math.abs(Math.floor(offset / 12)) * 12) % 12 + 1

  const firstDate = new Date(`${year}-${padZero(month)}-01`).getDate()
  const lastDate = new Date(new Date(`${year}-${padZero((month % 12) + 1)}-01`).getTime() - 86400000).getDate()

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

export const formatDate = (date, options) => dateformat(date, options)
export const formatPlainDate = (year, month, date) => `${year}-${padZero(month)}-${padZero(date)}`
export const formatMonth = (month) => dateformat(`2000-${month}-01`, 'mmmm')

export const getSelectionDates = (year, month) => {
  const lastDate = new Date(new Date(`${year}-${padZero((parseInt(month, 10) % 12) + 1)}-01`).getTime() - 86400000).getDate()

  return new Array(lastDate).fill(0).map((val, index) => index + 1)
}

export const getSelectionYears = () => {
  const now = new Date()

  const year = now.getFullYear()

  const lastYear = year + 3
  const firstYear = 1970

  return new Array(lastYear - firstYear).fill(0).map((val, index) => firstYear + index)
}

export const getSelectionMonths = () => new Array(12).fill(0).map((val, index) => index + 1)
