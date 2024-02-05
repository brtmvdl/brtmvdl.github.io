import { HTML, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { HorizontalSeparatorHTML } from '../horizontal.separator.html.js'
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
    this.append(({ none: this.getNoneHTML(), input: this.getInputHTML(), output: this.getOutputHTML(), error: this.getErrorHTML() })[this.data.side])
    this.append(this.getFooterHTML())
    console.log('data', this.data)
  }

  setStyles() {
    this.setContainerStyle('background-color', ({ none: '#ffffff', input: '#000000', output: '#000000', error: '#ff0000' })[this.data.side])
    this.setContainerStyle('color', ({ none: '#000000', input: '#ffffff', output: '#ff0000', error: '#000000' })[this.data.side])
    this.setContainerStyle('margin', '0rem 0rem 1rem 0rem')
    this.setContainerStyle('box-sizing', 'border-box')
    this.setContainerStyle('padding', '1rem')
    this.setContainerStyle('width', '100%')
  }

  getHeaderHTML() {
    return new TextHTML(`Method: ${this.data.method} (${this.data.side})`)
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
    return new TextHTML(`Id: ${this.data.id}`)
  }
}

export class errorMessage extends MessageHTML {
  getHeaderHTML() {
    return new TextHTML('error')
  }
}

export class pingMessage extends MessageHTML { }

export class timeMessage extends MessageHTML {
  getOutputHTML() {
    return new TextHTML(`Server Time: ${this.data.params.serverTime}`)
  }
}

export class exchangeInfoMessage extends MessageHTML {
  getInputHTML() {
    return new TextHTML(`Symbol: ${this.data.params.symbol}`)
  }
}

export class TableMessage extends MessageHTML {
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

export class tradesRecentMessage extends MessageHTML { }

export class tradesHistoricalMessage extends MessageHTML { }

export class tradesAggregateMessage extends MessageHTML { }

export class klinesMessage extends MessageHTML { }

export class uiKlinesMessage extends MessageHTML { }

export class avgPriceMessage extends MessageHTML { }

export class ticker24hrMessage extends MessageHTML { }

export class tickerTradingDayMessage extends MessageHTML { }

export class tickerMessage extends MessageHTML { }

export class tickerPriceMessage extends MessageHTML {
  getOutputHTML() {
    const output = new HTML()
    output.append(new TextHTML(`Symbol: ${this.data.params.symbol}`))
    output.append(new TextHTML(`Price: ${this.data.params.price}`))
    return output
  }
}

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
