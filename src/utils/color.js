export const stringToColor = (str) => {
  const len = str.length
  const splitLen = len / 6
  let parts = []
  const letters = str.split('')

  for (let i = 0; i < len; i += splitLen) {
    const sectionStart = Math.floor(i)
    const sectionEnd = Math.ceil(splitLen) + sectionStart
    parts.push(letters.slice(sectionStart, sectionEnd))
  }

  parts = parts.map(part => {
    const avg = Math.floor(part.reduce((acc, letter) => acc + letter.charCodeAt(0), 0) / part.length)
    const colorCode = (avg % 16).toString(16)
    return colorCode
  })

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
