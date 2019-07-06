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

  console.log(color)
}
