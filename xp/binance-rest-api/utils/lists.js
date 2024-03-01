import { RequestModel } from '../models/request.model.js'

export const getEndpointsList = () => Array.from([
  'Binance Rest API',
  'System Status (System)',
])

export const getEndpointsRequest = (method) => {
  switch (method) {
    case 'ping': return []
    case 'System Status (System)': return new RequestModel('GET', '/sapi/v1/system/status', [], [], [])
  }

  return []
}
