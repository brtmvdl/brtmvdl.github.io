// 

export const padLeft = (text = '', length = 1, pad = ' ') => {
  while (text.toString().length < length) text = pad.toString() + text.toString()
  return text.toString()
}

export const timestamp2str = (timestamp = Date.now()) => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}/${padLeft(date.getMonth() + 1, 2, '0')}/${padLeft(date.getDate(), 2, '0')} ${padLeft(date.getHours(), 2, '0')}:${padLeft(date.getMinutes(), 2, '0')}:${padLeft(date.getSeconds(), 2, '0')}`
}
