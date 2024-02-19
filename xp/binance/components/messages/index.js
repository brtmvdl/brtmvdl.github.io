import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'

import { HorizontalSeparatorHTML } from '../horizontal.separator.html.js'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { LinkComponent } from '../link.component.js'
import { KeyValueHTML } from '../key-value.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { TextHTML } from '../text.html.js'
import { CardHTML } from '../card.html.js'
import * as str from '../../utils/str.js'

export class MessageCardHTML extends CardHTML {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.setAttr('id', this.data.id)
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    if (this.data.output?.rateLimits?.length) this.append(this.getRateLimitsHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    const flex = new nFlex()
    const method = new TextHTML(this.data.method)
    const link = new LinkComponent()
    link.href('#' + (this.data.side == 'output' ? this.data.output.id : this.data.id))
    link.append(method)
    flex.append(link)
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

  getRateLimitsHTML() {
    const ratelimits = new CardBodyHTML()
    const table = this.getTableHTML(this.data.output.rateLimits)
    table.setStyle('width', '100%')
    ratelimits.append(table)
    return ratelimits
  }

  getNoneHTML() {
    return new TextHTML('none')
  }

  getInputHTML() {
    return new TextHTML('empty input')
  }

  getOutputHTML() {
    return new TextHTML('empty output')
  }

  getErrorHTML() {
    const { code, msg } = this.data.params
    const error = new HTML()
    error.append(new TextHTML(`Code: ${code}`))
    error.append(new TextHTML(`Message: ${msg}`))
    return error
  }

  getFooterHTML() {
    const { id } = this.data.params
    const footer = new CardFooterHTML()
    footer.append(new TextHTML(str.timestamp2str(id)))
    return footer
  }

  createData(text) {
    const td = new nTd()
    td.setStyle('border', '1px solid #000000')
    td.setStyle('padding', 'calc(1rem / 4)')
    td.setText(text)
    return td
  }

  createRow(arr) {
    const tr = new nTr()
    Array.from(arr).map((text) => tr.append(this.createData(text)))
    return tr
  }

  getTableHTML(rows = [], ths = null) {
    const table = new nTable()
    table.setStyle('border', '1px solid #000000')
    table.setStyle('border-collapse', 'collapse')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}

export class errorMessage extends MessageCardHTML { }

export class openMessage extends MessageCardHTML { }

export class closeMessage extends MessageCardHTML { }

export class downloadMessage extends MessageCardHTML {
  getNoneHTML() {
    const messages = this.data.params.messages
    const type = 'application/json'
    const lastModified = Date.now()
    const filename = `${lastModified}.json`
    const link = new LinkComponent()
    link.setAttr('download', filename)
    link.setText(filename)
    link.href(URL.createObjectURL(new File([new Blob([JSON.stringify(messages)], { type })], filename, { type, lastModified })))
    return link
  }
}

export class pingMessage extends MessageCardHTML {
  getInputHTML() {
    return new HTML()
  }

  getOutputHTML() {
    return new HTML()
  }
}

export class timeMessage extends MessageCardHTML {
  getInputHTML() {
    return new HTML()
  }

  getOutputHTML() {
    const { serverTime } = this.data.params
    return new TextHTML(`Server Time: ${str.timestamp2str(serverTime)}`)
  }
}

export class exchangeInfoMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.params
    return new TextHTML(`Symbol: ${symbol}`)
  }

  getOutputHTML() {
    const output = new HTML()
    const [symbol] = this.data.params.symbols

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
    Array.from(['permissions:']).concat(symbol['permissions']).map((perm) => output.append(new TextHTML(perm)))

    return output
  }

}

export class depthMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, limit } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    input.append(new TextHTML(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const { asks, bids } = this.data.params
    const output = new HTML()
    output.append(new TextHTML('Asks'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(asks, ['Price', 'Quantity']))
    output.append(new HorizontalSeparatorHTML())
    output.append(new TextHTML('Bids'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(bids, ['Price', 'Quantity']))
    return output
  }
}

export class tradesRecentMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, limit } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    input.append(new TextHTML(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const output = new HTML()
    const params = Array.from(this.data.params).map(({ id, isBestMatch, isBuyerMaker, price, qty, quoteQty, time }) => ({ id, isBestMatch, isBuyerMaker, price: +price, qty: +qty, quoteQty: +quoteQty, time: str.timestamp2str(time) }))
    output.append(this.getTableHTML(params))
    return output
  }
}

export class tradesHistoricalMessage extends tradesRecentMessage {
  getInputHTML() {
    const { symbol, fromId, limit } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    input.append(new TextHTML(`From id: ${fromId}`))
    input.append(new TextHTML(`Limit: ${limit}`))
    return input
  }
}

export class tradesAggregateMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, limit } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    input.append(new TextHTML(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const output = new HTML()
    const params = Array.from(this.data.params).map(({ a, p, q, f, l, T, m, M, }) => ({ a, p: +p, q: +q, f, l, T: str.timestamp2str(T), m, M, }))
    const headers = ['Aggregate trade ID', 'Price', 'Quantity', 'First trade ID', 'Last trade ID', 'Timestamp', 'Was the buyer the maker?', 'Was the trade the best price match?',]
    output.append(this.getTableHTML(params, headers))
    return output
  }
}

export class klinesMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, interval, startTime, limit } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    input.append(new TextHTML(`Interval: ${interval}`))
    input.append(new TextHTML(`Start Time: ${startTime}`))
    input.append(new TextHTML(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const output = new HTML()
    output.append(this.getTableHTML(this.getData()))
    return output
  }

  getData() {
    return Array.from(this.data.params).map((
      [Open_Time, Open_Price, High_Price, Low_Price, Close_Price, Volume, Close_Time, Quote_Asset_volume, Number_of_trades, Taker_Buy_Base_Asset_volume, Taker_Buy_Quote_Asset_volume, Unused_field_ignore,]
    ) => (
      { Open_Time: str.timestamp2str(Open_Time), Open_Price: +Open_Price, High_Price: +High_Price, Low_Price: +Low_Price, Close_Price: +Close_Price, Close_Time: str.timestamp2str(Close_Time), Number_of_trades, }
    ))
  }
}

export class uiKlinesMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, interval, startTime, limit } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    input.append(new TextHTML(`Interval: ${interval}`))
    input.append(new TextHTML(`Start Time: ${startTime}`))
    input.append(new TextHTML(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const output = new HTML()
    output.append(this.getTableHTML(this.getData()))
    return output
  }

  getData() {
    return Array.from(this.data.params).map((
      [Open_Time, Open_Price, High_Price, Low_Price, Close_Price, Volume, Close_Time, Quote_Asset_volume, Number_of_trades, Taker_Buy_Base_Asset_volume, Taker_Buy_Quote_Asset_volume, Unused_field_ignore,]
    ) => (
      { Open_Time: str.timestamp2str(Open_Time), Open_Price: +Open_Price, High_Price: +High_Price, Low_Price: +Low_Price, Close_Price: +Close_Price, Close_Time: str.timestamp2str(Close_Time), Number_of_trades, }
    ))
  }
}

export class avgPriceMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { mins, price, closeTime } = this.data.params
    const html = new HTML()
    html.append(new TextHTML(`Average price interval: ${mins}mins`))
    html.append(new TextHTML(`Average price: ${+price}`))
    html.append(new TextHTML(`Last trade time: ${closeTime}`, str.timestamp2str(closeTime)))
    return html
  }
}

export class ticker24hrMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, priceChange, priceChangePercent, weightedAvgPrice, prevClosePrice, lastPrice, lastQty, bidPrice, askPrice, bidQty, askQty, openPrice, highPrice, lowPrice, volume, quoteVolume, openTime, closeTime, firstId, lastId, count } = this.data.params
    const html = new HTML()
    html.append((new TextHTML(`Symbol: ${symbol}`)))
    html.append((new TextHTML(`Price Change: ${+priceChange}`)))
    html.append((new TextHTML(`Price Change Percent: ${+priceChangePercent}`)))
    html.append((new TextHTML(`Weighted Average Price: ${+weightedAvgPrice}`)))
    html.append((new TextHTML(`Previous Close Price: ${+prevClosePrice}`)))
    html.append((new TextHTML(`Last Price: ${+lastPrice}`)))
    html.append((new TextHTML(`Last  Quantity: ${+lastQty}`)))
    html.append((new TextHTML(`Bid Price: ${+bidPrice}`)))
    html.append((new TextHTML(`Bid Quantity: ${+bidQty}`)))
    html.append((new TextHTML(`Ask Price: ${+askPrice}`)))
    html.append((new TextHTML(`Ask Quantity: ${+askQty}`)))
    html.append((new TextHTML(`Open Price: ${+openPrice}`)))
    html.append((new TextHTML(`High Price: ${+highPrice}`)))
    html.append((new TextHTML(`Low Price: ${+lowPrice}`)))
    html.append((new TextHTML(`Volume: ${+volume}`)))
    html.append((new TextHTML(`Quote Volume: ${+quoteVolume}`)))
    html.append((new TextHTML(`Open Time: ${openTime}`, str.timestamp2str(openTime))))
    html.append((new TextHTML(`Close Time: ${closeTime}`, str.timestamp2str(closeTime))))
    html.append((new TextHTML(`First Id: ${firstId}`)))
    html.append((new TextHTML(`Last Id: ${lastId}`)))
    html.append((new TextHTML(`Count: ${count}`)))
    return html
  }
}

export class tickerTradingDayMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, priceChange, priceChangePercent, weightedAvgPrice, prevClosePrice, lastPrice, lastQty, bidPrice, askPrice, bidQty, askQty, openPrice, highPrice, lowPrice, volume, quoteVolume, openTime, closeTime, firstId, lastId, count } = this.data.params
    const html = new HTML()
    html.append((new TextHTML(`Symbol: ${symbol}`)))
    html.append((new TextHTML(`Price Change: ${+priceChange}`)))
    html.append((new TextHTML(`Price Change Percent: ${+priceChangePercent}`)))
    html.append((new TextHTML(`Weighted Average Price: ${+weightedAvgPrice}`)))
    html.append((new TextHTML(`Last Price: ${+lastPrice}`)))
    html.append((new TextHTML(`Open Price: ${+openPrice}`)))
    html.append((new TextHTML(`High Price: ${+highPrice}`)))
    html.append((new TextHTML(`Low Price: ${+lowPrice}`)))
    html.append((new TextHTML(`Volume: ${+volume}`)))
    html.append((new TextHTML(`Quote Volume: ${+quoteVolume}`)))
    html.append((new TextHTML(`Open Time: ${openTime}`, str.timestamp2str(openTime))))
    html.append((new TextHTML(`Close Time: ${closeTime}`, str.timestamp2str(closeTime))))
    html.append((new TextHTML(`First Id: ${firstId}`)))
    html.append((new TextHTML(`Last Id: ${lastId}`)))
    html.append((new TextHTML(`Count: ${count}`)))
    return html
  }
}

export class tickerMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, windowSize } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    input.append(new TextHTML(`Window Size: ${windowSize}`))
    return input
  }

  getOutputHTML() {
    const { symbol, priceChange, priceChangePercent, weightedAvgPrice, lastPrice, openPrice, highPrice, lowPrice, volume, quoteVolume, openTime, closeTime, firstId, lastId, count } = this.data.params
    const html = new HTML()
    html.append((new TextHTML(`Symbol: ${symbol}`)))
    html.append((new TextHTML(`Price Change: ${+priceChange}`)))
    html.append((new TextHTML(`Price Change Percent: ${+priceChangePercent}`)))
    html.append((new TextHTML(`Weighted Average Price: ${+weightedAvgPrice}`)))
    html.append((new TextHTML(`Last Price: ${+lastPrice}`)))
    html.append((new TextHTML(`Open Price: ${+openPrice}`)))
    html.append((new TextHTML(`High Price: ${+highPrice}`)))
    html.append((new TextHTML(`Low Price: ${+lowPrice}`)))
    html.append((new TextHTML(`Volume: ${+volume}`)))
    html.append((new TextHTML(`Quote Volume: ${+quoteVolume}`)))
    html.append((new TextHTML(`Open Time: ${openTime}`, str.timestamp2str(openTime))))
    html.append((new TextHTML(`Close Time: ${closeTime}`, str.timestamp2str(closeTime))))
    html.append((new TextHTML(`First Id: ${firstId}`)))
    html.append((new TextHTML(`Last Id: ${lastId}`)))
    html.append((new TextHTML(`Count: ${count}`)))
    return html
  }
}

export class tickerPriceMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, price } = this.data.params
    const output = new HTML()
    output.append(new TextHTML(`Symbol: ${symbol}`))
    output.append(new TextHTML(`Price: ${+price}`))
    return output
  }
}

export class tickerBookMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.params
    const input = new HTML()
    input.append(new TextHTML(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, bidPrice, bidQty, askPrice, askQty } = this.data.params
    const html = new HTML()
    html.append((new TextHTML(`Symbol: ${symbol}`)))
    html.append((new TextHTML(`Bid Price: ${+bidPrice}`)))
    html.append((new TextHTML(`Bid Quantity: ${+bidQty}`)))
    html.append((new TextHTML(`Ask Price: ${+askPrice}`)))
    html.append((new TextHTML(`Ask Quantity: ${+askQty}`)))
    return html
  }
}

export class sessionStatusMessage extends MessageCardHTML {
  getOutputHTML() {
    const { authorizedSince, connectedSince, returnRateLimits, serverTime } = this.data.params
    const html = new HTML()
    html.append(new TextHTML(`Authorized Since: ${authorizedSince}`, str.timestamp2str(authorizedSince)))
    html.append(new TextHTML(`Connected Since: ${connectedSince}`, str.timestamp2str(connectedSince)))
    html.append(new TextHTML(`Return Rate Limits: ${returnRateLimits}`))
    html.append(new TextHTML(`Server Time: ${serverTime}`, str.timestamp2str(serverTime)))
    return html
  }
}

export class sessionLogonMessage extends MessageCardHTML { }

export class sessionLogoutMessage extends sessionStatusMessage { }

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

export class accountStatusMessage extends MessageCardHTML {
  getOutputHTML() {
    const { makerCommission, takerCommission, buyerCommission, sellerCommission, canTrade, canWithdraw, canDeposit, brokered, requireSelfTradePrevention, preventSor, updateTime, accountType, uid, balances, permissions, commissionRates, } = this.data.params
    const html = new HTML()
    html.append(new TextHTML(`UID: ${uid}`))
    html.append(new TextHTML(`Account Type: ${accountType}`))
    html.append(new TextHTML(`Maker Commission: ${makerCommission}`))
    html.append(new TextHTML(`Taker Commission: ${takerCommission}`))
    html.append(new TextHTML(`Buyer Commission: ${buyerCommission}`))
    html.append(new TextHTML(`Seller Commission: ${sellerCommission}`))
    html.append(new TextHTML(`Can Trade: ${canTrade}`))
    html.append(new TextHTML(`Can Withdraw: ${canWithdraw}`))
    html.append(new TextHTML(`Can Deposit: ${canDeposit}`))
    html.append(new TextHTML(`Brokered: ${brokered}`))
    html.append(new TextHTML(`Require Self Trade Prevention: ${requireSelfTradePrevention}`))
    html.append(new TextHTML(`Prevent Sor: ${preventSor}`))
    html.append(new TextHTML(`Update Time: ${updateTime}`, str.timestamp2str(updateTime)))
    html.append(new TextHTML(`Permissions: ${permissions}`))
    html.append(new TextHTML(`Commission Rate (buyer): ${commissionRates.buyer}`))
    html.append(new TextHTML(`Commission Rate (maker): ${commissionRates.maker}`))
    html.append(new TextHTML(`Commission Rate (seller): ${commissionRates.seller}`))
    html.append(new TextHTML(`Commission Rate (taker): ${commissionRates.taker}`))
    html.append(new TextHTML(`Balances: `))
    html.append(this.getTableHTML(balances))
    return html
  }
}

export class accountCommissionMessage extends MessageCardHTML { }

export class accountRateLimitsOrdersMessage extends MessageCardHTML { }

export class allOrdersMessage extends MessageCardHTML { }

export class allOrderListsMessage extends MessageCardHTML { }

export class myTradesMessage extends MessageCardHTML { }

export class myPreventedMatchesMessage extends MessageCardHTML { }

export class myAllocationsMessage extends MessageCardHTML { }

export class userDataStreamStartMessage extends MessageCardHTML { }

export class userDataStreamPingMessage extends MessageCardHTML { }

export class userDataStreamStopMessage extends MessageCardHTML { }
