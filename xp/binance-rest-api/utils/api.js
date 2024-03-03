import * as config from './config.js'

const getUrl = (pathname, search = {}) => `${config.url}${pathname}?` + new URLSearchParams(search)

export const request = (method, pathname, query, headers, body) => fetch(getUrl(pathname, query), { method, headers, body }).then(res => res.json())
