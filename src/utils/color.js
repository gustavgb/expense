export const stringToColor = (str) => {
  const len = str.length
  const splitLen = len / 6
  let parts = []
  const letters = str.split('').map((letter, index) => {
    const weight = (len - index) / len
    const value = letter.charCodeAt(0) * weight
    return Math.round(value)
  })

  for (let i = 0; i < 6; i++) {
    const sectionStart = Math.floor(i)
    const sectionEnd = Math.ceil(splitLen) + sectionStart
    const slice = letters.slice(sectionStart, sectionEnd)
    const sum = slice.reduce((acc, val) => acc + val, 0)
    const part = (sum % 16).toString(16)
    parts.push(part)
  }

  const color = '#' + parts.join('')

  return color
}

export const invertColor = (hex) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  return (
    parseInt(hex.slice(0, 2), 16) * 0.299 +
    parseInt(hex.slice(2, 4), 16) * 0.587 +
    parseInt(hex.slice(4, 6), 16) * 0.114
  ) > 186
    ? '#000000'
    : '#FFFFFF'
}
