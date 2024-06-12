
export const padRight = (text = '', length = 1, pad = ' ') => {
  while (text.toString().length < length) {
    text = text.toString() + pad.toString()
  }

  return text.toString()
}

export const fixDecimals = (num) => {
  return num.toString()
    .replace(/(.)999999.*/, (_, x) => +x + 1)
    .replace(/000000.*/ig, '')
}

export const price2string = (price = 0, coin = '') => {
  const [bills, cents] = price.toString().split('.')
  return [coin, `${bills},${fixDecimals(padRight(cents, 2, '0'))}`]
    .filter((text) => text.length > 0)
    .join(' ')
}
