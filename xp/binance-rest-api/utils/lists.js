import { RequestModel } from '../models/request.model.js'

export const getEndpointsList = () => Array.from([
  'Binance Rest API',
  'System Status (System)',
  'Kline/Candlestick Data',
])

export const getEndpointsRequest = (endpoint) => {
  switch (endpoint) {
    case 'ping': return new RequestModel()
    case 'System Status (System)': return new RequestModel('GET', '/sapi/v1/system/status', [], [], [])
    case 'Kline/Candlestick Data': return new RequestModel('GET', '/api/v3/klines', ['symbol', 'interval'], [], [])
  }

  return new RequestModel()
}
