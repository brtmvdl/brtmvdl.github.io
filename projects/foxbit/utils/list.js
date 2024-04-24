import { RequestsInputModel } from '../models/requests.input.model.js'

export const getRequestsList = () => ([
  new RequestsInputModel('List currencies', 'GET', '/currencies', [], []),
  new RequestsInputModel('List markets', 'GET', '/', [], []),
  new RequestsInputModel('Get a market quotation', 'GET', '/', [], []),
  new RequestsInputModel('Get order book', 'GET', '/', [], []),
  new RequestsInputModel('Get candles', 'GET', '/', [], []),
  new RequestsInputModel('Get candlesticks', 'GET', '/', [], []),
  new RequestsInputModel('List banks', 'GET', '/', [], []),
  new RequestsInputModel('Get current time', 'GET', '/', [], []),
])
