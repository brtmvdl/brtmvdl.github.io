import * as Local from './local.js'

export const goTo = (page, data = null) => {
  Local.set([page], data)
  (window.location = page)
}

export const getCurrentURL = () => {
  const url = new URL(window.location)
  url.searchParams.forEach((key) => url.searchParams.delete(key))
  url.hash = ''
  return url.toString()
}
