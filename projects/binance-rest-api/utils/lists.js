import { RequestModel } from '../models/request.model.js'

export const endpoints = {
  'Test Connectivity': new RequestModel('GET', '/api/v3/ping', [], [], []),
  'Check Server Time': new RequestModel('GET', '/api/v3/time', [], [], []),
  'Exchange Information': new RequestModel('GET', '/api/v3/exchangeInfo', [], [], []),
  'Order Book': new RequestModel('GET', '/api/v3/depth', [], [], []),
  'Recent Trades List': new RequestModel('GET', '/api/v3/trades', [], [], []),
  'Compressed/Aggregate Trades List': new RequestModel('GET', '/api/v3/aggTrades', [], [], []),
  'Old Trade Lookup': new RequestModel('GET', '/api/v3/historicalTrades', [], [], []),
  'Kline/Candlestick Data': new RequestModel('GET', '/api/v3/klines', [], [], []),
  'UIKlines': new RequestModel('GET', '/api/v3/uiKlines', [], [], []),
  'Current Average Price': new RequestModel('GET', '/api/v3/avgPrice', [], [], []),
  'Rolling window price change statistics': new RequestModel('GET', '/api/v3/ticker', [], [], []),
  '24hr Ticker Price Change Statistics': new RequestModel('GET', '/api/v3/ticker/24hr', [], [], []),
  'Trading Day Ticker': new RequestModel('GET', '/api/v3/ticker/tradingDay', [], [], []),
  'Symbol Price Ticker': new RequestModel('GET', '/api/v3/ticker/price', [], [], []),
  'Symbol Order Book Ticker': new RequestModel('GET', '/api/v3/ticker/bookTicker', [], [], []),
  'Account Trade List (USER_DATA)': new RequestModel('GET', '/api/v3/myTrades', [], [], []),
  'Query Open OCO (USER_DATA)': new RequestModel('GET', '/api/v3/openOrderList', [], [], []),
  'Query all OCO (USER_DATA)': new RequestModel('GET', '/api/v3/allOrderList', [], [], []),
  'Query Order (USER_DATA)': new RequestModel('GET', '/api/v3/order', [], [], []),
  'Query OCO (USER_DATA)': new RequestModel('GET', '/api/v3/orderList', [], [], []),
  'Query Commission Rates (USER_DATA)': new RequestModel('GET', '/api/v3/account/commission', [], [], []),
  'Account Information (USER_DATA)': new RequestModel('GET', '/api/v3/account', [], [], []),
  'Current Open Orders (USER_DATA)': new RequestModel('GET', '/api/v3/openOrders', [], [], []),
  'All Orders (USER_DATA)': new RequestModel('GET', '/api/v3/allOrders', [], [], []),
  'Query Allocations (USER_DATA)': new RequestModel('GET', '/api/v3/myAllocations', [], [], []),
  'Query Prevented Matches (USER_DATA)': new RequestModel('GET', '/api/v3/myPreventedMatches', [], [], []),
  'Account Information (USER_DATA)': new RequestModel('GET', '/api/v3/account', [], [], []),
  'Query Current Order Count Usage (TRADE)': new RequestModel('GET', '/api/v3/rateLimit/order', [], [], []),
  'Test New Order (TRADE)': new RequestModel('POST', '/api/v3/order/test', [], [], []),
  'Test new order using SOR (TRADE)': new RequestModel('POST', '/api/v3/sor/order/test', [], [], []),
  'New order using SOR (TRADE)': new RequestModel('POST', '/api/v3/sor/order', [], [], []),
  'Cancel and Replace an Order (TRADE)': new RequestModel('POST', '/api/v3/order/cancelReplace', [], [], []),
  'New Order (TRADE)': new RequestModel('POST', '/api/v3/order', [], [], []),
  'New OCO (TRADE)': new RequestModel('POST', '/api/v3/order/oco', [], [], []),
  'Cancel Order (TRADE)': new RequestModel('DELETE', '/api/v3/order', [], [], []),
  'Cancel OCO (TRADE)': new RequestModel('DELETE', '/api/v3/orderList', [], [], []),
  'Cancel all Open Orders on a Symbol (TRADE)': new RequestModel('DELETE', '/api/v3/openOrders', [], [], []),
  'Create a ListenKey (USER_STREAM)': new RequestModel('POST', '/api/v3/userDataStream', [], [], []),
  'Ping/Keep-alive a ListenKey (USER_STREAM)': new RequestModel('PUT', '/api/v3/userDataStream', [], [], []),
  'Close a ListenKey (USER_STREAM)': new RequestModel('DELETE', '/api/v3/userDataStream', [], [], []),
}

export const getEndpointsList = () => Array.from([
  'Binance Rest API',
  ...Object.keys(endpoints),
])

export const getEndpointsRequest = (endpoint) => {
  if (!endpoints[endpoint]) {
    return new RequestModel()
  }

  return endpoints[endpoint]
}
