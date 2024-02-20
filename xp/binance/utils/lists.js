// 

export const getMethodsList = () => Array.from([
  'Binance WebSocket API',
  ...getInBrowserMethodsList(),
  ...getWebSocketMethodsList(),
  ...getUserDataStreamMethodsList(),
])

export const getInBrowserMethodsList = () => Array.from([
  'ping',
  'time',
  'exchangeInfo',
  'depth',
  'trades.recent',
  'trades.historical',
  'trades.aggregate',
  'klines',
  'uiKlines',
  'avgPrice',
  'ticker.24hr',
  'ticker.tradingDay',
  'ticker',
  'ticker.price',
  'ticker.book',
  'session.status',
  'session.logout',
])

export const getWebSocketMethodsList = () => Array.from([
  'session.logon',
  'order.test',
  'order.place',
  'order.status',
  'order.cancel',
  'order.cancelReplace',
  'openOrders.status',
  'openOrders.cancelAll',
  'orderList.status',
  'orderList.place',
  'orderList.cancel',
  'openOrderLists.status',
  'sor.order.place',
  'sor.order.test',
  'account.status',
  'account.commission',
  'account.rateLimits.orders',
  'allOrders',
  'allOrderLists',
  'myTrades',
  'myPreventedMatches',
  'myAllocations',
])


export const getUserDataStreamMethodsList = () => Array.from([
  'userDataStream.start',
  'userDataStream.ping',
  'userDataStream.stop',
])

export const getParamsList = (method) => {
  switch (method) {
    case 'ping': return []
    case 'time': return []
    case 'exchangeInfo': return ['symbol']
    case 'depth': return ['symbol', 'limit']
    case 'trades.recent': return ['symbol', 'limit']
    case 'trades.historical': return ['symbol', 'fromId', 'limit']
    case 'trades.aggregate': return ['symbol', 'fromId', 'limit']
    case 'klines': return ['symbol', 'interval', 'startTime', 'limit']
    case 'uiKlines': return ['symbol', 'interval', 'startTime', 'limit']
    case 'avgPrice': return ['symbol']
    case 'ticker.24hr': return ['symbol']
    case 'ticker.tradingDay': return ['symbol']
    case 'ticker': return ['symbol', 'windowSize']
    case 'ticker.price': return ['symbol']
    case 'ticker.book': return ['symbol']
    case 'session.logon': return []
    case 'session.status': return []
    case 'session.logout': return []
    case 'order.test': return ['symbol', 'side', 'type', 'timeInForce', 'price', 'quantity']
    case 'order.place': return ['symbol', 'side', 'type', 'price', 'quantity', 'timeInForce']
    case 'order.status': return ['symbol', 'orderId']
    case 'order.cancel': return ['symbol', 'origClientOrderId']
    case 'order.cancelReplace': return ['symbol', 'cancelReplaceMode', 'cancelOrigClientOrderId', 'side', 'type', 'timeInForce', 'price', 'quantity']
    case 'openOrders.status': return ['symbol']
    case 'openOrders.cancelAll': return ['symbol']
    case 'orderList.place': return ['symbol', 'side', 'price', 'quantity', 'stopPrice', 'stopLimitPrice', 'stopLimitTimeInForce', 'newOrderRespType']
    case 'orderList.status': return ['origClientOrderId']
    case 'orderList.cancel': return ['symbol', 'orderListId']
    case 'openOrderLists.status': return []
    case 'sor.order.place': return ['symbol', 'side', 'type', 'quantity', 'timeInForce', 'price']
    case 'sor.order.test': return ['symbol', 'side', 'type', 'quantity', 'timeInForce', 'price']
    case 'account.status': return []
    case 'account.commission': return ['symbol']
    case 'account.rateLimits.orders': return []
    case 'allOrders': return ['symbol', 'startTime', 'endTime', 'limit']
    case 'allOrderLists': return ['startTime', 'endTime', 'limit']
    case 'myTrades': return ['symbol', 'startTime', 'endTime']
    case 'myPreventedMatches': return ['symbol', 'orderId']
    case 'myAllocations': return ['symbol', 'orderId']
    case 'userDataStream.start': return []
    case 'userDataStream.ping': return ['listenKey']
    case 'userDataStream.stop': return ['listenKey']
  }

  return []
}
