// 

export const add = (key = [], value = null) => {
  const list = get(key, []) || []
  list.push(value)
  return set(key, list)
}

export const get = (key = [], def = null) => {
  try {
    return JSON.parse(localStorage.getItem(key.join('.')))
  } catch (e) {
    console.error(e)
  }

  return def
}

export const set = (key = [], value = null) => {
  localStorage.setItem(key.join('.'), JSON.stringify(value))
}
