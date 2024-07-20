// 
import { fixDecimals } from './math.js'

export const padLeft = (text, length = 1, pad = ' ') => {
  while (text.toString().length < length) text = pad.toString() + text.toString()
  return text.toString()
}

export const datetime2str = (datetime = Date.now()) => {
  const date = new Date(datetime)
  return `${date.getFullYear()}/${padLeft(date.getMonth(), 2, '0')}/${padLeft(date.getDate(), 2, '0')} ${padLeft(date.getHours(), 2, '0')}:${padLeft(date.getMinutes(), 2, '0')}:${padLeft(date.getSeconds(), 2, '0')}`
}

export const interval2str = (interval = 0) => {
  const hours = 0
  const minutes = 0
  const seconds = 0

  return `${hours}:${minutes}:${seconds} ago`
}

export const secondsToMinutes = (s = 0) => {
  const seconds = s * (60 ** 0)
  const minutes = (s * (60 ** 1)) - (seconds * (60))
  const hours = (s * (60 ** 2)) - (seconds * (60)) - (minutes * (60 * 60))

  return `${padLeft(hours, 2, '0')}:${padLeft(minutes, 2, '0')}:${padLeft(seconds, 2, '0')}`
}

export const timestamp2str = (timestamp = Date.now()) => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}/${padLeft(date.getMonth() + 1, 2, '0')}/${padLeft(date.getDate(), 2, '0')} ${padLeft(date.getHours(), 2, '0')}:${padLeft(date.getMinutes(), 2, '0')}:${padLeft(date.getSeconds(), 2, '0')}`
}

export const getDate = (day) => {
  const date = new Date(2024, 1, day)
  return `${date.getFullYear()}-${padLeft(date.getMonth() + 1, 2, '0')}-${padLeft(date.getDay(), 2, '0')}`
}

export const padRight = (text = '', length = 1, pad = ' ') => {
  while (text.toString().length < length) {
    text = text.toString() + pad.toString()
  }

  return text.toString()
}

export const price2string = (price = 0, coin = '') => {
  const [bills, cents] = price.toString().split('.')
  return [coin, `${bills},${fixDecimals(padRight(cents, 2, '0'))}`]
    .filter((text) => text.length > 0)
    .join(' ')
}
