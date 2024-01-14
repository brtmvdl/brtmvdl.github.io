
export const set = (key, value = '') => new Promise((s) => s(localStorage.setItem(key, JSON.stringify(value))))

export const get = (key, def = null) => new Promise((s) => {
  const json = JSON.parse(localStorage.getItem(key))
  if (json === null) s(def)
  else s(json)
})

export const add = (key, value = '') => get(key, []).then((list) => {
  list.push(value)
  return set(key, list)
})
