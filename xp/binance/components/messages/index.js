import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'

import { HorizontalSeparatorHTML } from '../horizontal.separator.html.js'
import { TextHTML } from '../text.html.js'
import { CardHTML } from '../card.html.js'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { KeyValueHTML } from '../key-value.html.js'

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
    const flex = new nFlex()
    flex.append(new TextHTML(this.data.method))
    flex.append(new TextHTML(this.data.side))
    header.append(flex)
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
    return new TextHTML('none')
  }

  getInputHTML() {
    return new TextHTML('input')
  }

  getOutputHTML() {
    return new TextHTML('output')
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

export class ObjectMessage extends MessageCardHTML {
  getTableHTML(rows = [], ths = null) {
    const table = new nTable()
    const th = new nTr()
    Array.from(ths === null ? Object.keys(rows[0]) : ths).map((text) => {
      const td = new nTd()
      td.setText(text)
      th.append(td)
    })
    table.append(th)
    Array.from(rows).map((row) => {
      const tr = new nTr()
      Object.keys(row).map((col) => {
        const td = new nTd()
        td.setText(row[col])
        tr.append(td)
      })
      table.append(tr)
    })
    return table
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

export class exchangeInfoMessage extends ObjectMessage {
  getInputHTML() {
    return new TextHTML(`Symbol: ${this.data.params.symbol}`)
  }

  getOutputHTML() {
    const output = new HTML()
    const symbol = this.data.params.symbols[0]

    output.append(new KeyValueHTML('status', symbol['status']))
    output.append(new KeyValueHTML('symbol', symbol['symbol']))
    output.append(new KeyValueHTML('baseAsset', symbol['baseAsset']))
    output.append(new KeyValueHTML('baseAssetPrecision', symbol['baseAssetPrecision']))
    output.append(new KeyValueHTML('baseCommissionPrecision', symbol['baseCommissionPrecision']))
    output.append(new KeyValueHTML('quoteAsset', symbol['quoteAsset']))
    output.append(new KeyValueHTML('quoteAssetPrecision', symbol['quoteAssetPrecision']))
    output.append(new KeyValueHTML('quoteCommissionPrecision', symbol['quoteCommissionPrecision']))
    output.append(new KeyValueHTML('quoteOrderQtyMarketAllowed', symbol['quoteOrderQtyMarketAllowed']))
    output.append(new KeyValueHTML('quotePrecision', symbol['quotePrecision']))
    output.append(new KeyValueHTML('allowTrailingStop', symbol['allowTrailingStop']))
    output.append(new KeyValueHTML('allowedSelfTradePreventionModes', symbol['allowedSelfTradePreventionModes']))
    output.append(new KeyValueHTML('cancelReplaceAllowed', symbol['cancelReplaceAllowed']))
    output.append(new KeyValueHTML('defaultSelfTradePreventionMode', symbol['defaultSelfTradePreventionMode']))
    // output.append(new KeyValueHTML('filters', symbol['filters']))
    output.append(new KeyValueHTML('icebergAllowed', symbol['icebergAllowed']))
    output.append(new KeyValueHTML('isMarginTradingAllowed', symbol['isMarginTradingAllowed']))
    output.append(new KeyValueHTML('isSpotTradingAllowed', symbol['isSpotTradingAllowed']))
    output.append(new KeyValueHTML('ocoAllowed', symbol['ocoAllowed']))
    output.append(new KeyValueHTML('orderTypes', symbol['orderTypes']))
    // output.append(new KeyValueHTML('permissions', symbol['permissions']))

    return output
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
    output.append(new TextHTML('Asks'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(this.data.params.asks, ['Price', 'Quantity']))
    output.append(new HorizontalSeparatorHTML())
    output.append(new TextHTML('Bids'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(this.data.params.bids, ['Price', 'Quantity']))
    return output
  }
}

export class tradesRecentMessage extends ObjectMessage {
  getOutputHTML() {
    const output = new HTML()
    const params = Array.from(this.data.params).map(({ id, isBestMatch, isBuyerMaker, price, qty, quoteQty, time }) => ({ id, isBestMatch, isBuyerMaker, price: +price, qty: +qty, quoteQty: +quoteQty, time: str.timestamp2str(time) }))
    output.append(this.getTableHTML(params))
    return output
  }
}

export class tradesHistoricalMessage extends tradesRecentMessage { }

export class tradesAggregateMessage extends ObjectMessage {
  getOutputHTML() {
    const output = new HTML()
    const params = Array.from(this.data.params).map(({ a, p, q, f, l, T, m, M, }) => ({ a, p, q, f, l, T: str.timestamp2str(T), m, M, }))
    const headers = ['Aggregate trade ID', 'Price', 'Quantity', 'First trade ID', 'Last trade ID', 'Timestamp', 'Was the buyer the maker?', 'Was the trade the best price match?',]
    output.append(this.getTableHTML(params, headers))
    return output
  }
}

export class klinesMessage extends ObjectMessage {
  getOutputHTML() {
    const output = new HTML()
    // output.setText('https://observablehq.com/@d3/candlestick-chart/2?intent=fork')
    // output.append(this.getCharts())
    output.append(this.getTableHTML(this.getData()))
    return output
  }

  getData() {
    return Array.from(this.data.params).map((
      [Open_Time, Open_Price, High_Price, Low_Price, Close_Price, Volume, Close_Time, Quote_Asset_volume, Number_of_trades, Taker_Buy_Base_Asset_volume, Taker_Buy_Quote_Asset_volume, Unused_field_ignore,]
    ) => (
      { Open_Time, Open_Price, High_Price, Low_Price, Close_Price, Volume, Close_Time, Quote_Asset_volume, Number_of_trades, Taker_Buy_Base_Asset_volume, Taker_Buy_Quote_Asset_volume, Unused_field_ignore, }
    ))
  }
}

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
