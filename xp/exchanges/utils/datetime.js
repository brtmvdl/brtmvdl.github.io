import { padLeft } from '../utils/str.js'

export const getNow = () => Date.now().toString()

export const datetime2str = (timestamp = Date.now()) => {
  const datetime = new Date(+timestamp)

  const date = [
    datetime.getFullYear(),
    datetime.getMonth() + 1,
    datetime.getDay(),
  ].map((d) => padLeft(d, 2, '0')).join('-')

  const time = [
    datetime.getHours(),
    datetime.getMinutes(),
    datetime.getSeconds(),
  ].map((t) => padLeft(t, 2, '0')).join(':')

  return `${date} ${time}`
}
