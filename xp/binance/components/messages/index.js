import { HTML } from '@brtmvdl/frontend'

import { TextHTML } from '../text.html.js'

export class MessageHTML extends HTML {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() { return new HTML() }

  getBodyHTML() { return new TextHTML(this.data) }

  getFooterHTML() { return new HTML() }

  setStyles() {
    this.setStyle('background-color', ({ none: '#ffffff', input: '#000000', output: '#000000', error: '#ff0000' })[this.data.side])
    this.setStyle('color', ({ none: '#000000', input: '#ffffff', output: '#ff0000', error: '#000000' })[this.data.side])
  }
}

export class errorMessage extends MessageHTML {
  getHeaderHTML() {
    return new TextHTML('error')
  }
}

export class pingMessage extends MessageHTML { }

export class timeMessage extends MessageHTML { }

export class exchangeInfoMessage extends MessageHTML { }

export class depthMessage extends MessageHTML { }

export class tradesRecentMessage extends MessageHTML { }

export class tradesHistoricalMessage extends MessageHTML { }

export class tradesAggregateMessage extends MessageHTML { }

export class klinesMessage extends MessageHTML { }

export class uiKlinesMessage extends MessageHTML { }

export class avgPriceMessage extends MessageHTML { }

export class ticker24hrMessage extends MessageHTML { }

export class tickerTradingDayMessage extends MessageHTML { }

export class tickerMessage extends MessageHTML { }

export class tickerPriceMessage extends MessageHTML { }

export class tickerBookMessage extends MessageHTML { }

export class sessionStatusMessage extends MessageHTML { }

export class sessionLogonMessage extends MessageHTML { }

export class sessionLogoutMessage extends MessageHTML { }

export class orderTestMessage extends MessageHTML { }

export class orderPlaceMessage extends MessageHTML { }

export class orderStatusMessage extends MessageHTML { }

export class orderCancelMessage extends MessageHTML { }

export class orderCancelReplaceMessage extends MessageHTML { }

export class openOrdersStatusMessage extends MessageHTML { }

export class openOrdersCancelAllMessage extends MessageHTML { }

export class orderListStatusMessage extends MessageHTML { }

export class orderListPlaceMessage extends MessageHTML { }

export class orderListCancelMessage extends MessageHTML { }

export class openOrderListsStatusMessage extends MessageHTML { }

export class sorOrderPlaceMessage extends MessageHTML { }

export class sorOrderTestMessage extends MessageHTML { }

export class accountStatusMessage extends MessageHTML { }

export class accountCommissionMessage extends MessageHTML { }

export class allOrdersMessage extends MessageHTML { }

export class allOrderListsMessage extends MessageHTML { }

export class myTradesMessage extends MessageHTML { }

export class myPreventedMatchesMessage extends MessageHTML { }

export class myAllocationsMessage extends MessageHTML { }

export class userDataStreamStartMessage extends MessageHTML { }

export class userDataStreamPingMessage extends MessageHTML { }

export class userDataStreamStopMessage extends MessageHTML { }
