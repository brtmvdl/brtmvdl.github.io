export const u = new URL(window.location)

export const usp = new URLSearchParams(u.search)

export const getURLSearchParam = (name, def = '') => usp.get(name) || def

export const getParams = () => ({
  color: '#' + getURLSearchParam('color', '000000'),
  bgcolor: '#' + getURLSearchParam('bgcolor', 'ffffff'),
  margin: getURLSearchParam('margin', '0rem'),
  title: getURLSearchParam('title', 'IMC')
})
