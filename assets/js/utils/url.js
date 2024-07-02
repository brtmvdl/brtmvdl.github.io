export const u = new URL(window.location)

export const usp = new URLSearchParams(u.search)

export const getURLSearchParam = (name, def = '') => usp.get(name) || def

export const getParams = ({ color = '000000', bgcolor = 'ffffff', margin = '0rem', title = '' } = {}) => ({
  color: '#' + getURLSearchParam('color', color),
  bgcolor: '#' + getURLSearchParam('bgcolor', bgcolor),
  margin: getURLSearchParam('margin', margin),
  title: getURLSearchParam('title', title)
})
