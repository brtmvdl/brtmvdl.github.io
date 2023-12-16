import * as config from './config.js'

const api = (method = 'GET', url = '', headers = {}, data = {}) => {
  return new Promise(() => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    Array.from(headers).map(([key, value = '']) => xhr.setRequestHeader(key, value))

    const onComplete = () => console.log({ xhr })
    xhr.onload = () => onComplete()
    xhr.onerror = () => onComplete()

    xhr.send(JSON.stringify(data))
  })
}

const url = (paths) => [config.URL_BASE, ...paths].join('/')

const post = (paths = [], headers = {}, data = {}) => api(
  'POST',
  url(paths),
  headers,
  data
)

const get = (paths = [], headers = {}) => api(
  'GET',
  url(paths),
  headers,
  null
)

export const userinfo = () => get(['userinfo'], {})
