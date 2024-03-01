import * as config from './config.js'

export const request = (pathname, method, headers, body) => fetch(`${config.url}${pathname}`, { method, headers, body }).then(res => res.json())
