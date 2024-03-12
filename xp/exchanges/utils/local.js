//

export const get = (key, def = null) => {
  try {
    return JSON.parse(localStorage.getItem(key.join('.'))) || def
  } catch (e) {
    console.error(e)
  }

  return def
}

export const set = (key, value = {}) => {
  localStorage.setItem(key.join('.'), JSON.stringify(value))
}

export const add = (key, value = {}) => {
  const list = get(key, [])
  list.push(value)
  set(key, list)
}
