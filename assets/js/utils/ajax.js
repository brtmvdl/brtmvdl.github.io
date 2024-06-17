import { Response } from './http.js'

export const request = (method = 'GET', url = '', body = {}, headers = {}) => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)

    Object.keys(headers).map((h) => xhr.setRequestHeader(h, headers[h]))

    const onComplete = () => xhr.status === 200 ? res(new Response(xhr)) : rej(new Response(xhr))
    xhr.onload = () => onComplete()
    xhr.onerror = () => onComplete()
    xhr.send(JSON.stringify(body))
  })
}

export const get = (url) => request('GET', url)

export const getJSON = (url) => request('GET', url + '.json')

export const post = (url, body = {}) => request('POST', url, body)
