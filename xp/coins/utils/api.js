import { ErrorResponse, Response, SuccessResponse } from './http.js'

const BINANCE_API = 'https://api4.binance.com/api/v3'

const request = (method = 'GET', path = '/', headers = {}, body = {}) => {
  return new Promise((s, f) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, `${BINANCE_API}/${path}`, true)

    const onComplete = () => {
      xhr.status === 200
        ? s(new SuccessResponse(xhr))
        : f(new ErrorResponse(xhr))
    }

    xhr.onload = () => onComplete()
    xhr.onerror = () => onComplete()

    xhr.send(JSON.stringify(body))
  })
}

export const getPrice = (price) => request('GET', `ticker/price?symbol=${price}`)
