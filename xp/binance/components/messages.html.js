import { HTML } from '@brtmvdl/frontend'

import * as messages from './messages/index.js'

export class MessagesHTML extends HTML {
  children = {
    list: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setEvents()
    this.append(this.getListHTML())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  onMessage({ value } = {}) {
    this.children.list.prepend(this.getMessageHTML(value))
  }

  getMessageHTML(data) {
    switch (data.method) {
      case 'ping': return new messages.pingMessage(data)
      case 'time': return new messages.timeMessage(data)
      case 'exchangeInfo': return new messages.exchangeInfoMessage(data)
      case 'depth': return new messages.depthMessage(data)
      case 'trades.recent': return new messages.tradesRecentMessage(data)
      case 'trades.historical': return new messages.tradesHistoricalMessage(data)
      case 'trades.aggregate': return new messages.tradesAggregateMessage(data)
      case 'klines': return new messages.klinesMessage(data)
      case 'uiKlines': return new messages.uiKlinesMessage(data)
      case 'avgPrice': return new messages.avgPriceMessage(data)
      case 'ticker.24hr': return new messages.ticker24hrMessage(data)
      case 'ticker.tradingDay': return new messages.tickerTradingDayMessage(data)
      case 'ticker': return new messages.tickerMessage(data)
      case 'ticker.price': return new messages.tickerPriceMessage(data)
      case 'ticker.book': return new messages.tickerBookMessage(data)
      case 'session.status': return new messages.sessionStatusMessage(data)
      case 'session.logon': return new messages.sessionLogonMessage(data)
      case 'session.logout': return new messages.sessionLogoutMessage(data)
      case 'order.test': return new messages.orderTestMessage(data)
      case 'order.place': return new messages.orderPlaceMessage(data)
      case 'order.status': return new messages.orderStatusMessage(data)
      case 'order.cancel': return new messages.orderCancelMessage(data)
      case 'order.cancelReplace': return new messages.orderCancelReplaceMessage(data)
      case 'openOrders.status': return new messages.openOrdersStatusMessage(data)
      case 'openOrders.cancelAll': return new messages.openOrdersCancelAllMessage(data)
      case 'orderList.status': return new messages.orderListStatusMessage(data)
      case 'orderList.place': return new messages.orderListPlaceMessage(data)
      case 'orderList.cancel': return new messages.orderListCancelMessage(data)
      case 'openOrderLists.status': return new messages.openOrderListsStatusMessage(data)
      case 'sor.order.place': return new messages.sorOrderPlaceMessage(data)
      case 'sor.order.test': return new messages.sorOrderTestMessage(data)
      case 'account.status': return new messages.accountStatusMessage(data)
      case 'account.commission': return new messages.accountCommissionMessage(data)
      case 'account.rateLimits.ordersreturn ': new messages.accountRateLimitsOrdersMessage()
      case 'allOrders': return new messages.allOrdersMessage(data)
      case 'allOrderLists': return new messages.allOrderListsMessage(data)
      case 'myTrades': return new messages.myTradesMessage(data)
      case 'myPreventedMatches': return new messages.myPreventedMatchesMessage(data)
      case 'myAllocations': return new messages.myAllocationsMessage(data)
      case 'userDataStream.start': return new messages.userDataStreamStartMessage(data)
      case 'userDataStream.ping': return new messages.userDataStreamPingMessage(data)
      case 'userDataStream.stop': return new messages.userDataStreamStopMessage(data)
    }
    return new HTML()
  }

  getListHTML() {
    return this.children.list
  }
}
