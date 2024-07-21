import { SocketEndpointModel } from '../../../assets/js/models/socket.endpoint.model.js'

export const getEndpointsList = () => Array.from([
  new SocketEndpointModel('input', 'Foxbit WebSocket API'),
  //
  new SocketEndpointModel('input', 'AuthenticateUser', ['APIKey', 'Nonce', 'UserId', 'Signature']),
  new SocketEndpointModel('input', 'Authenticate2FA', ['Code']),
  new SocketEndpointModel('input', 'CancelAllOrders', ['IntrumentId']),
  new SocketEndpointModel('input', 'CancelOrder', ['OMSId', 'AccountId', 'ClOrderId', 'OrderId']),
  new SocketEndpointModel('input', 'GetAccountInfo', ['OMSId', 'AccountId']),
  new SocketEndpointModel('input', 'GetAccountPositions', ['AccountId', 'OMSId']),
  new SocketEndpointModel('input', 'GetAccountTrades', ['OMSId', 'AccountId', 'StartIndex', 'Count']),
  new SocketEndpointModel('input', 'GetDepositTickets', []),
  new SocketEndpointModel('input', 'GetInstrument', ['InstrumentId']),
  new SocketEndpointModel('input', 'GetInstruments', ['OMSId']),
  new SocketEndpointModel('input', 'GetOpenOrders', ['OMSId', 'AccountId']),
  new SocketEndpointModel('input', 'GetOrderFee', ['OMSId', 'AccountId', 'InstrumentId', 'ProductId', 'Amount', 'OrderType', 'MakerTaker', 'Side', 'Quantity']),
  new SocketEndpointModel('input', 'GetOrderHistory', ['OMSId', 'AccountId', 'Depth']),
  new SocketEndpointModel('input', 'GetOrderStatus', ['AccountId', 'OrderId']),
  new SocketEndpointModel('input', 'GetProducts', ['OMSId']),
  new SocketEndpointModel('input', 'GetL2Snapshot', ['OMSId', 'InstrumentId', 'Depth']),
  new SocketEndpointModel('input', 'GetTickerHistory', ['InstrumentId', 'Interval', 'FromDate', 'ToDate']),
  new SocketEndpointModel('input', 'GetTradesHistory', ['omsId', 'accountId', 'instrumentId', 'tradeId', 'orderId', 'userId', 'startTimeStamp', 'endTimeStamp', 'depth', 'startIndex', 'executionId']),
  new SocketEndpointModel('input', 'GetUserInfo', []),
  new SocketEndpointModel('input', 'GetUserPermissions', []),
  new SocketEndpointModel('input', 'GetWithdrawTickets', ['Limit']),
  new SocketEndpointModel('input', 'Logout', []),
  new SocketEndpointModel('input', 'SendOrder', ['OMSId', 'InstrumentId', 'AccountId', 'TimeInForce', 'ClientOrderId', 'OrderIdOCO', 'UseDisplayQuantity', 'Side', 'Quantity', 'OrderType', 'PegPriceType', 'LimitPrice']),
  // new SocketEndpointModel('input', 'SubscribeAccountEvents', []),
  new SocketEndpointModel('input', 'SubscribeLevel1', ['InstrumentId', 'MarketId']),
  new SocketEndpointModel('input', 'SubscribeLevel1Markets', ['MarketId']),
  new SocketEndpointModel('input', 'SubscribeLevel2', ['InstrumentId', 'MarketId', 'Depth']),
  new SocketEndpointModel('input', 'SubscribeTicker', ['OMSId', 'InstrumentId', 'Interval', 'IncludeLastCount']),
  new SocketEndpointModel('input', 'SubscribeTrades', ['OMSId', 'InstrumentId', 'IncludeLastCount']),
  new SocketEndpointModel('input', 'UnsubscribeLevel1', ['OMSId', 'InstrumentId']),
  new SocketEndpointModel('input', 'UnsubscribeLevel2', ['OMSId', 'InstrumentId']),
  new SocketEndpointModel('input', 'UnsubscribeTicker', ['InstrumentId']),
  new SocketEndpointModel('input', 'UnsubscribeTrades', ['OMSId', 'InstrumentId']),
])

export const getInputEndpointsList = () => Array.from(getEndpointsList().filter(({ side }) => side == 'input'))

export const getOutputEndpointsList = () => Array.from(getEndpointsList().filter(({ side }) => side == 'output'))
