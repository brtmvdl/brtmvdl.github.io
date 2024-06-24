import * as config from './config.js'

const getUrl = (pathname, search = {}) => {
  const url = new URL(config.url); console.log({ pathname, search })
  url.pathname = pathname
  const searchParams = new URLSearchParams(search)
  Object.keys(searchParams).map((s) => url.searchParams.get(s))
  return url.toString()
}

export const request = (method, pathname, query, headers, body) => fetch(getUrl(pathname, query), { method, headers, body }).then(res => res.json())
