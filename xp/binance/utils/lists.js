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

export const getParamsList = () => ({
  'ping': [],
  'time': [],
  'exchangeInfo': ['symbol'],
  'depth': ['symbol', 'limit'],
  'trades.recent': ['symbol', 'limit'],
  'trades.historical': ['symbol', 'fromId', 'limit'],
  'trades.aggregate': ['symbol', 'fromId', 'limit'],
  'klines': ['symbol', 'interval', 'startTime', 'limit'],
  'uiKlines': ['symbol', 'interval', 'startTime', 'limit'],
  'avgPrice': ['symbol'],
  'ticker.24hr': ['symbol'],
  'ticker.tradingDay': ['symbol'],
  'ticker': ['symbol', 'windowSize'],
  'ticker.price': ['symbol'],
  'ticker.book': ['symbol'],
  'session.logon': [],
  'session.status': [],
  'session.logout': [],
  'order.test': ['symbol', 'side', 'type', 'timeInForce', 'price', 'quantity'],
  'order.place': ['symbol', 'side', 'type', 'price', 'quantity', 'timeInForce'],
  'order.status': ['symbol', 'orderId'],
  'order.cancel': ['symbol', 'origClientOrderId'],
  'order.cancelReplace': ['symbol', 'cancelReplaceMode', 'cancelOrigClientOrderId', 'side', 'type', 'timeInForce', 'price', 'quantity'],
  'openOrders.status': ['symbol'],
  'openOrders.cancelAll': ['symbol'],
  'orderList.place': ['symbol', 'side', 'price', 'quantity', 'stopPrice', 'stopLimitPrice', 'stopLimitTimeInForce', 'newOrderRespType'],
  'orderList.status': ['origClientOrderId'],
  'orderList.cancel': ['symbol', 'orderListId'],
  'openOrderLists.status': [],
  'sor.order.place': ['symbol', 'side', 'type', 'quantity', 'timeInForce', 'price'],
  'sor.order.test': ['symbol', 'side', 'type', 'quantity', 'timeInForce', 'price'],
  'account.status': [],
  'account.commission': ['symbol'],
  'account.rateLimits.orders': [],
  'allOrders': ['symbol', 'startTime', 'endTime', 'limit'],
  'allOrderLists': ['startTime', 'endTime', 'limit'],
  'myTrades': ['symbol', 'startTime', 'endTime'],
  'myPreventedMatches': ['symbol', 'orderId'],
  'myAllocations': ['symbol', 'orderId'],
  'userDataStream.start': [],
  'userDataStream.ping': ['listenKey'],
  'userDataStream.stop': ['listenKey'],
})
