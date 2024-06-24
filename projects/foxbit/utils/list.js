import { RequestModel } from '../../../assets/js/models/request.model.js'

export const getRequestsList = () => ([
  new RequestModel('List currencies', 'GET', '/currencies'),
  new RequestModel('List markets', 'GET', '/markets'),
  new RequestModel('Get a market quotation', 'GET', '/markets/quotes'),
  new RequestModel('Get order book', 'GET', '/markets/{market_symbol}/orderbook'),
  new RequestModel('Get candlesticks', 'GET', '/markets/{market_symbol}/candlesticks'),
  new RequestModel('List banks', 'GET', '/banks'),
  new RequestModel('Get current time', 'GET', '/system/time'),
])
