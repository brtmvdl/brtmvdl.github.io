// 

export const get = (key = [], def = null) => {
  const str = localStorage.getItem(key.join('.'))
  try {
    return JSON.parse(str)
  } catch(e) {
    console.error(e)
  }

  return def
}

export const set = (key, value = '') => {
  const str = JSON.stringify(value)
  localStorage.setItem(key.join('.'), str)
}
