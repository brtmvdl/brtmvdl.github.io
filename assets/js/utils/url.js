export const u = new URL(window.location)

export const usp = new URLSearchParams(u.searchParams)

export const getURLSearchParam = (name, def = '') => usp.get(name) || def

export const getParams = ({ color = '000000', bgcolor = 'ffffff', margin = '0rem', title = '', id = '' } = {}) => ({
  color: '#' + getURLSearchParam('color', color),
  bgcolor: '#' + getURLSearchParam('bgcolor', bgcolor),
  margin: getURLSearchParam('margin', margin),
  title: getURLSearchParam('title', title),
  id: getURLSearchParam('id', id)
})

export const createURL = ({ search = {} } = {}) => {
  const url = new URL(window.location)
  Object.keys(search).map((key) => url.searchParams.set(key, search[key]))
  return url.toString()
}
