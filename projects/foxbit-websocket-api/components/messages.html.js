import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../../../assets/js/models/message.model.js'

import * as messages from './messages/index.js'

export class MessagesHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  onMessage({ value } = {}) {
    this.prepend(this.getMessageHTML(value))
  }

  getMessageHTML(data = new MessageModel()) {
    switch (data.Endpoint) {
      case 'log': return new messages.logMessage(data)
      case 'open': return new messages.openMessage(data)
      case 'close': return new messages.closeMessage(data)
      case 'AuthenticateUser': return new messages.AuthenticateUserMessage(data)
      case 'Authenticate2FA': return new messages.Authenticate2FAMessage(data)
      case 'Logout': return new messages.LogoutMessage(data)
      case 'GetUserInfo': return new messages.GetUserInfoMessage(data)
      case 'GetUserPermissions': return new messages.GetUserPermissionsMessage(data)
      case 'GetWithdrawTickets': return new messages.GetWithdrawTicketsMessage(data)
      case 'GetDepositTickets': return new messages.GetDepositTicketsMessage(data)
      case 'GetInstrument': return new messages.GetInstrumentMessage(data)
      case 'GetInstruments': return new messages.GetInstrumentsMessage(data)
      case 'GetProducts': return new messages.GetProductsMessage(data)
      case 'GetL2Snapshot': return new messages.GetL2SnapshotMessage(data)
      case 'GetTickerHistory': return new messages.GetTickerHistoryMessage(data)
      case 'SubscribeAccountEvents': return new messages.SubscribeAccountEventsMessage(data)
      case 'SubscribeLevel1': return new messages.SubscribeLevel1Message(data)
      case 'UnsubscribeLevel1': return new messages.UnsubscribeLevel1Message(data)
      case 'SubscribeLevel2': return new messages.SubscribeLevel2Message(data)
      case 'UnsubscribeLevel2': return new messages.UnsubscribeLevel2Message(data)
      case 'SubscribeLevel1Markets': return new messages.SubscribeLevel1MarketsMessage(data)
      case 'SubscribeTicker': return new messages.SubscribeTickerMessage(data)
      case 'UnsubscribeTicker': return new messages.UnsubscribeTickerMessage(data)
      case 'SubscribeTrades': return new messages.SubscribeTradesMessage(data)
      case 'UnsubscribeTrades': return new messages.UnsubscribeTradesMessage(data)
      case 'SendOrder': return new messages.SendOrderMessage(data)
      case 'GetOrderFee': return new messages.GetOrderFeeMessage(data)
      case 'GetTradesHistory': return new messages.GetTradesHistoryMessage(data)
      case 'CancelOrder': return new messages.CancelOrderMessage(data)
      case 'GetOrderHistory': return new messages.GetOrderHistoryMessage(data)
      case 'GetOrderStatus': return new messages.GetOrderStatusMessage(data)
      case 'GetOpenOrders': return new messages.GetOpenOrdersMessage(data)
      case 'CancelAllOrders': return new messages.CancelAllOrdersMessage(data)
      case 'GetAccountInfo': return new messages.GetAccountInfoMessage(data)
      case 'GetAccountPositions': return new messages.GetAccountPositionsMessage(data)
      case 'GetAccountTrades': return new messages.GetAccountTradesMessage(data)
    }

    return new HTML()
  }
}
