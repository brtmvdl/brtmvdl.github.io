import * as config from './config.js'

export const request = (method, pathname, query, headers, body) => fetch(`${config.url}${pathname}`, { method, query, headers, body }).then(res => res.json())
