import { HTML, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { HorizontalSeparatorHTML } from '../horizontal.separator.html.js'
import { TextHTML } from '../text.html.js'
import { CardHTML } from '../card.html.js'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { CardFooterHTML } from '../card-footer.html.js'

import * as str from '../../utils/str.js'

export class MessageCardHTML extends CardHTML {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.append(new TextHTML(`Method: ${this.data.method} (${this.data.side})`))
    return header
  }

  getBodyHTML() {
    const body = new CardBodyHTML()
    switch (this.data.side) {
      case 'none': body.append(this.getNoneHTML()); break;
      case 'input': body.append(this.getInputHTML()); break;
      case 'output': body.append(this.getOutputHTML()); break;
      case 'error': body.append(this.getErrorHTML()); break;
    }

    return body
  }

  getNoneHTML() {
    return new HTML()
  }

  getInputHTML() {
    return new HTML()
  }

  getOutputHTML() {
    return new HTML()
  }

  getErrorHTML() {
    const error = new HTML()
    error.append(new TextHTML(`Code: ${this.data.params.code}`))
    error.append(new TextHTML(`Message: ${this.data.params.msg}`))
    return error
  }

  getFooterHTML() {
    const footer = new CardFooterHTML()
    footer.append(new TextHTML(str.timestamp2str(this.data.params.id)))
    return footer
  }
}

export class errorMessage extends MessageCardHTML {
  getHeaderHTML() {
    return new TextHTML('error')
  }
}

export class pingMessage extends MessageCardHTML { }

export class timeMessage extends MessageCardHTML {
  getOutputHTML() {
    return new TextHTML(`Server Time: ${str.timestamp2str(this.data.params.serverTime)}`)
  }
}

export class exchangeInfoMessage extends MessageCardHTML {
  getInputHTML() {
    return new TextHTML(`Symbol: ${this.data.params.symbol}`)
  }
}

export class TableMessage extends MessageCardHTML {
  getTableHTML(rows = [], ths = []) {
    const table = new nTable()
    const th = new nTr()
    Array.from(ths).map((text) => {
      const td = new nTd()
      td.setText(text)
      th.append(td)
    })
    table.append(th)
    Array.from(rows).map((lines) => {
      const tr = new nTr()
      Array.from(lines).map((text) => {
        const td = new nTd()
        td.setText(text)
        tr.append(td)
      })
      table.append(tr)
    })
    return table
  }
}

export class depthMessage extends TableMessage {
  getOutputHTML() {
    const output = new HTML()
    output.append(new HorizontalSeparatorHTML())
    output.append(new TextHTML('Asks'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(this.data.params.asks, ['Price', 'Quantity']))
    output.append(new HorizontalSeparatorHTML())
    output.append(new TextHTML('Bids'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(this.data.params.bids, ['Price', 'Quantity']))
    output.append(new HorizontalSeparatorHTML())
    return output
  }
}

export class tradesRecentMessage extends MessageCardHTML { }

export class tradesHistoricalMessage extends MessageCardHTML { }

export class tradesAggregateMessage extends MessageCardHTML { }

export class klinesMessage extends MessageCardHTML { }

export class uiKlinesMessage extends MessageCardHTML { }

export class avgPriceMessage extends MessageCardHTML { }

export class ticker24hrMessage extends MessageCardHTML { }

export class tickerTradingDayMessage extends MessageCardHTML { }

export class tickerMessage extends MessageCardHTML { }

export class tickerPriceMessage extends MessageCardHTML {
  getOutputHTML() {
    const output = new HTML()
    output.append(new TextHTML(`Symbol: ${this.data.params.symbol}`))
    output.append(new TextHTML(`Price: ${this.data.params.price}`))
    return output
  }
}

export class tickerBookMessage extends MessageCardHTML { }

export class sessionStatusMessage extends MessageCardHTML { }

export class sessionLogonMessage extends MessageCardHTML { }

export class sessionLogoutMessage extends MessageCardHTML { }

export class orderTestMessage extends MessageCardHTML { }

export class orderPlaceMessage extends MessageCardHTML { }

export class orderStatusMessage extends MessageCardHTML { }

export class orderCancelMessage extends MessageCardHTML { }

export class orderCancelReplaceMessage extends MessageCardHTML { }

export class openOrdersStatusMessage extends MessageCardHTML { }

export class openOrdersCancelAllMessage extends MessageCardHTML { }

export class orderListStatusMessage extends MessageCardHTML { }

export class orderListPlaceMessage extends MessageCardHTML { }

export class orderListCancelMessage extends MessageCardHTML { }

export class openOrderListsStatusMessage extends MessageCardHTML { }

export class sorOrderPlaceMessage extends MessageCardHTML { }

export class sorOrderTestMessage extends MessageCardHTML { }

export class accountStatusMessage extends MessageCardHTML { }

export class accountCommissionMessage extends MessageCardHTML { }

export class allOrdersMessage extends MessageCardHTML { }

export class allOrderListsMessage extends MessageCardHTML { }

export class myTradesMessage extends MessageCardHTML { }

export class myPreventedMatchesMessage extends MessageCardHTML { }

export class myAllocationsMessage extends MessageCardHTML { }

export class userDataStreamStartMessage extends MessageCardHTML { }

export class userDataStreamPingMessage extends MessageCardHTML { }

export class userDataStreamStopMessage extends MessageCardHTML { }
