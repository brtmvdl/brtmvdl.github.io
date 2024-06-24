import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { HorizontalSeparatorHTML } from '../../../../assets/js/components/horizontal.separator.html.js'
import { ButtonComponent } from '../../../../assets/js/components/button.component.js'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { LinkComponent } from '../../../../assets/js/components/link.component.js'
import { KeyValueHTML } from '../../../../assets/js/components/key-value.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { TextComponent } from '../../../../assets/js/components/text.component.js'
import { CardHTML } from '../card.html.js'
import * as str from '../../../../assets/js/utils/str.js'

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
    const method = new TextComponent(this.data.method)
    const link = new LinkComponent()
    link.href('#' + (this.data.side == 'output' ? this.data.output.id : this.data.id))
    link.append(method)
    flex.append(link)
    flex.append(new TextComponent(this.data.side))
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
    return new TextComponent('none message')
  }

  getInputHTML() {
    return new TextComponent(JSON.stringify(this.data.input))
  }

  getOutputHTML() {
    return new TextComponent(JSON.stringify(this.data.output.result))
  }

  getErrorHTML() {
    const { code, msg } = this.data.output.error
    const error = new HTML()
    error.append(new TextComponent(`Code: ${code}`))
    error.append(new TextComponent(`Message: ${msg}`))
    return error
  }

  getFooterHTML() {
    const { id } = this.data.input
    const footer = new CardFooterHTML()
    footer.append(new TextComponent(str.timestamp2str(id)))
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
    if (rows.length === 0) return new HTML()
    const table = new nTable()
    table.setStyle('border', '1px solid #000000')
    table.setStyle('border-collapse', 'collapse')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}

export class logMessage extends MessageCardHTML {
  getNoneHTML() {
    return new TextComponent(JSON.stringify(this.data))
  }
}

export class downloadMessage extends MessageCardHTML {
  getNoneHTML() {
    const { messages } = this.data.input
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
    const { serverTime } = this.data.output.result
    return new TextComponent(`Server Time: ${str.timestamp2str(serverTime)}`)
  }
}

export class exchangeInfoMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.input
    return new TextComponent(`Symbol: ${symbol}`)
  }

  getOutputHTML() {
    const output = new HTML()
    const [symbol] = this.data.output.result.symbols

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
    Array.from(['permissions:']).concat(symbol['permissions']).map((perm) => output.append(new TextComponent(perm)))

    return output
  }

}

export class depthMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, limit } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    input.append(new TextComponent(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const { asks, bids } = this.data.output.result
    const output = new HTML()
    output.append(new TextComponent('Asks'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(asks, ['Price', 'Quantity']))
    output.append(new HorizontalSeparatorHTML())
    output.append(new TextComponent('Bids'))
    output.append(new HorizontalSeparatorHTML())
    output.append(this.getTableHTML(bids, ['Price', 'Quantity']))
    return output
  }
}

export class tradesRecentMessage extends MessageCardHTML {
  children = {
    button: new ButtonComponent(),
    chart: new HTML(),
  }

  getInputHTML() {
    const { symbol, limit } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    input.append(new TextComponent(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const output = new HTML()
    const params = Array.from(this.data.output.result).map(({ id, isBestMatch, isBuyerMaker, price, qty, quoteQty, time }) => ({ id, isBestMatch, isBuyerMaker, price: +price, qty: +qty, quoteQty: +quoteQty, time: str.timestamp2str(time) }))
    output.append(this.getTableHTML(params))
    output.append(this.getCreateChartButton())
    output.append(this.getChartHTML())
    return output
  }

  getCreateChartButton() {
    this.children.button.setText('create chart')
    this.children.button.on('click', () => this.onCreateChartButtonClick())
    return this.children.button
  }

  onCreateChartButtonClick() {
    const calc = (n, ix = 1, inc = 2) => n < inc ? ix : calc(n / inc, ix + 1)
    const result = Array.from(this.data.output.result).map((item, ix) => ({ x: item.time, y: item.price, r: calc(item.qty, 1, 10) }))
  }

  getChartHTML() {
    return this.children.chart
  }
}

export class tradesHistoricalMessage extends tradesRecentMessage {
  getInputHTML() {
    const { symbol, fromId, limit } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    input.append(new TextComponent(`From id: ${fromId}`))
    input.append(new TextComponent(`Limit: ${limit}`))
    return input
  }
}

export class tradesAggregateMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, limit } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    input.append(new TextComponent(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const output = new HTML()
    const params = Array.from(this.data.output.result).map(({ a, p, q, f, l, T, m, M, }) => ({ a, p: +p, q: +q, f, l, T: str.timestamp2str(T), m, M, }))
    const headers = ['Aggregate trade ID', 'Price', 'Quantity', 'First trade ID', 'Last trade ID', 'Timestamp', 'Was the buyer the maker?', 'Was the trade the best price match?',]
    output.append(this.getTableHTML(params, headers))
    return output
  }
}

export class klinesMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, interval, startTime, limit } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    input.append(new TextComponent(`Interval: ${interval}`))
    input.append(new TextComponent(`Start Time: ${startTime}`, str.timestamp2str(startTime)))
    input.append(new TextComponent(`Limit: ${limit}`))
    return input
  }

  getOutputHTML() {
    const output = new HTML()
    output.append(this.getTableHTML(this.getData()))
    return output
  }

  getData() {
    return Array.from(this.data.output.result).map((
      [Open_Time, Open_Price, High_Price, Low_Price, Close_Price, Volume, Close_Time, Quote_Asset_volume, Number_of_trades, Taker_Buy_Base_Asset_volume, Taker_Buy_Quote_Asset_volume, Unused_field_ignore,]
    ) => (
      { Open_Time: str.timestamp2str(Open_Time), Open_Price: +Open_Price, High_Price: +High_Price, Low_Price: +Low_Price, Close_Price: +Close_Price, Close_Time: str.timestamp2str(Close_Time), Number_of_trades, }
    ))
  }
}

export class uiKlinesMessage extends klinesMessage { }

export class avgPriceMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { mins, price, closeTime } = this.data.output.result
    const html = new HTML()
    html.append(new TextComponent(`Average price interval: ${mins}mins`))
    html.append(new TextComponent(`Average price: ${+price}`))
    html.append(new TextComponent(`Last trade time: ${closeTime}`, str.timestamp2str(closeTime)))
    return html
  }
}

export class ticker24hrMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, priceChange, priceChangePercent, weightedAvgPrice, prevClosePrice, lastPrice, lastQty, bidPrice, askPrice, bidQty, askQty, openPrice, highPrice, lowPrice, volume, quoteVolume, openTime, closeTime, firstId, lastId, count } = this.data.output.result
    const html = new HTML()
    html.append((new TextComponent(`Symbol: ${symbol}`)))
    html.append((new TextComponent(`Price Change: ${+priceChange}`)))
    html.append((new TextComponent(`Price Change Percent: ${+priceChangePercent}`)))
    html.append((new TextComponent(`Weighted Average Price: ${+weightedAvgPrice}`)))
    html.append((new TextComponent(`Previous Close Price: ${+prevClosePrice}`)))
    html.append((new TextComponent(`Last Price: ${+lastPrice}`)))
    html.append((new TextComponent(`Last  Quantity: ${+lastQty}`)))
    html.append((new TextComponent(`Bid Price: ${+bidPrice}`)))
    html.append((new TextComponent(`Bid Quantity: ${+bidQty}`)))
    html.append((new TextComponent(`Ask Price: ${+askPrice}`)))
    html.append((new TextComponent(`Ask Quantity: ${+askQty}`)))
    html.append((new TextComponent(`Open Price: ${+openPrice}`)))
    html.append((new TextComponent(`High Price: ${+highPrice}`)))
    html.append((new TextComponent(`Low Price: ${+lowPrice}`)))
    html.append((new TextComponent(`Volume: ${+volume}`)))
    html.append((new TextComponent(`Quote Volume: ${+quoteVolume}`)))
    html.append((new TextComponent(`Open Time: ${openTime}`, str.timestamp2str(openTime))))
    html.append((new TextComponent(`Close Time: ${closeTime}`, str.timestamp2str(closeTime))))
    html.append((new TextComponent(`First Id: ${firstId}`)))
    html.append((new TextComponent(`Last Id: ${lastId}`)))
    html.append((new TextComponent(`Count: ${count}`)))
    return html
  }
}

export class tickerTradingDayMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, priceChange, priceChangePercent, weightedAvgPrice, prevClosePrice, lastPrice, lastQty, bidPrice, askPrice, bidQty, askQty, openPrice, highPrice, lowPrice, volume, quoteVolume, openTime, closeTime, firstId, lastId, count } = this.data.output.result
    const html = new HTML()
    html.append((new TextComponent(`Symbol: ${symbol}`)))
    html.append((new TextComponent(`Price Change: ${+priceChange}`)))
    html.append((new TextComponent(`Price Change Percent: ${+priceChangePercent}`)))
    html.append((new TextComponent(`Weighted Average Price: ${+weightedAvgPrice}`)))
    html.append((new TextComponent(`Last Price: ${+lastPrice}`)))
    html.append((new TextComponent(`Open Price: ${+openPrice}`)))
    html.append((new TextComponent(`High Price: ${+highPrice}`)))
    html.append((new TextComponent(`Low Price: ${+lowPrice}`)))
    html.append((new TextComponent(`Volume: ${+volume}`)))
    html.append((new TextComponent(`Quote Volume: ${+quoteVolume}`)))
    html.append((new TextComponent(`Open Time: ${openTime}`, str.timestamp2str(openTime))))
    html.append((new TextComponent(`Close Time: ${closeTime}`, str.timestamp2str(closeTime))))
    html.append((new TextComponent(`First Id: ${firstId}`)))
    html.append((new TextComponent(`Last Id: ${lastId}`)))
    html.append((new TextComponent(`Count: ${count}`)))
    return html
  }
}

export class tickerMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol, windowSize } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    input.append(new TextComponent(`Window Size: ${windowSize}`))
    return input
  }

  getOutputHTML() {
    const { symbol, priceChange, priceChangePercent, weightedAvgPrice, lastPrice, openPrice, highPrice, lowPrice, volume, quoteVolume, openTime, closeTime, firstId, lastId, count } = this.data.output.result
    const html = new HTML()
    html.append((new TextComponent(`Symbol: ${symbol}`)))
    html.append((new TextComponent(`Price Change: ${+priceChange}`)))
    html.append((new TextComponent(`Price Change Percent: ${+priceChangePercent}`)))
    html.append((new TextComponent(`Weighted Average Price: ${+weightedAvgPrice}`)))
    html.append((new TextComponent(`Last Price: ${+lastPrice}`)))
    html.append((new TextComponent(`Open Price: ${+openPrice}`)))
    html.append((new TextComponent(`High Price: ${+highPrice}`)))
    html.append((new TextComponent(`Low Price: ${+lowPrice}`)))
    html.append((new TextComponent(`Volume: ${+volume}`)))
    html.append((new TextComponent(`Quote Volume: ${+quoteVolume}`)))
    html.append((new TextComponent(`Open Time: ${openTime}`, str.timestamp2str(openTime))))
    html.append((new TextComponent(`Close Time: ${closeTime}`, str.timestamp2str(closeTime))))
    html.append((new TextComponent(`First Id: ${firstId}`)))
    html.append((new TextComponent(`Last Id: ${lastId}`)))
    html.append((new TextComponent(`Count: ${count}`)))
    return html
  }
}

export class tickerPriceMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, price } = this.data.output.result
    const output = new HTML()
    output.append(new TextComponent(`Symbol: ${symbol}`))
    output.append(new TextComponent(`Price: ${+price}`))
    return output
  }
}

export class tickerBookMessage extends MessageCardHTML {
  getInputHTML() {
    const { symbol } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    return input
  }

  getOutputHTML() {
    const { symbol, bidPrice, bidQty, askPrice, askQty } = this.data.output.result
    const html = new HTML()
    html.append((new TextComponent(`Symbol: ${symbol}`)))
    html.append((new TextComponent(`Bid Price: ${+bidPrice}`)))
    html.append((new TextComponent(`Bid Quantity: ${+bidQty}`)))
    html.append((new TextComponent(`Ask Price: ${+askPrice}`)))
    html.append((new TextComponent(`Ask Quantity: ${+askQty}`)))
    return html
  }
}

export class sessionStatusMessage extends MessageCardHTML {
  getOutputHTML() {
    const { authorizedSince, connectedSince, returnRateLimits, serverTime } = this.data.output.result
    const html = new HTML()
    html.append(new TextComponent(`Authorized Since: ${authorizedSince}`, str.timestamp2str(authorizedSince)))
    html.append(new TextComponent(`Connected Since: ${connectedSince}`, str.timestamp2str(connectedSince)))
    html.append(new TextComponent(`Return Rate Limits: ${returnRateLimits}`))
    html.append(new TextComponent(`Server Time: ${serverTime}`, str.timestamp2str(serverTime)))
    return html
  }
}

export class sessionLogonMessage extends MessageCardHTML { }

export class sessionLogoutMessage extends sessionStatusMessage { }

export class errorMessage extends MessageCardHTML { }

export class openMessage extends MessageCardHTML { }

export class closeMessage extends MessageCardHTML {
  getNoneHTML() {
    return new TextComponent(`Reason: ${this.data.input.reason}`)
  }
}

export class orderTestMessage extends MessageCardHTML {
  getInputHTML() {
    const { apiKey, price, quantity, side, symbol, timeInForce, timestamp, type, signature } = this.data.input
    const input = new HTML()
    input.append(new TextComponent(`Symbol: ${symbol}`))
    input.append(new TextComponent(`Side: ${side}`))
    input.append(new TextComponent(`Type: ${type}`))
    input.append(new TextComponent(`Time In Force: ${timeInForce}`))
    input.append(new TextComponent(`Price: ${price}`))
    input.append(new TextComponent(`Quantity: ${quantity}`))
    return input
  }
}

export class orderPlaceMessage extends orderTestMessage { }

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
    const { makerCommission, takerCommission, buyerCommission, sellerCommission, canTrade, canWithdraw, canDeposit, brokered, requireSelfTradePrevention, preventSor, updateTime, accountType, uid, balances, permissions, commissionRates, } = this.data.output.result
    const html = new HTML()
    html.append(new TextComponent(`UID: ${uid}`))
    html.append(new TextComponent(`Account Type: ${accountType}`))
    html.append(new TextComponent(`Maker Commission: ${makerCommission}`))
    html.append(new TextComponent(`Taker Commission: ${takerCommission}`))
    html.append(new TextComponent(`Buyer Commission: ${buyerCommission}`))
    html.append(new TextComponent(`Seller Commission: ${sellerCommission}`))
    html.append(new TextComponent(`Can Trade: ${canTrade}`))
    html.append(new TextComponent(`Can Withdraw: ${canWithdraw}`))
    html.append(new TextComponent(`Can Deposit: ${canDeposit}`))
    html.append(new TextComponent(`Brokered: ${brokered}`))
    html.append(new TextComponent(`Require Self Trade Prevention: ${requireSelfTradePrevention}`))
    html.append(new TextComponent(`Prevent Sor: ${preventSor}`))
    html.append(new TextComponent(`Update Time: ${updateTime}`, str.timestamp2str(updateTime)))
    html.append(new TextComponent(`Permissions: ${permissions}`))
    html.append(new TextComponent(`Commission Rate (buyer): ${commissionRates.buyer}`))
    html.append(new TextComponent(`Commission Rate (maker): ${commissionRates.maker}`))
    html.append(new TextComponent(`Commission Rate (seller): ${commissionRates.seller}`))
    html.append(new TextComponent(`Commission Rate (taker): ${commissionRates.taker}`))
    html.append(new TextComponent(`Balances: `))
    html.append(this.getTableHTML(this.removeZerosInBalances(balances)))
    return html
  }

  removeZerosInBalances(balances = []) {
    return balances.filter(({ free, locked }) => +free > 0 || +locked > 0)
  }
}

export class accountCommissionMessage extends MessageCardHTML {
  //   {
  //     "symbol": "USDTBRL",
  //     "standardCommission": {
  //         "maker": "0.00000000",
  //         "taker": "0.00100000",
  //         "buyer": "0.00000000",
  //         "seller": "0.00000000"
  //     },
  //     "taxCommission": {
  //         "maker": "0.00000000",
  //         "taker": "0.00000000",
  //         "buyer": "0.00000000",
  //         "seller": "0.00000000"
  //     },
  //     "discount": {
  //         "enabledForAccount": true,
  //         "enabledForSymbol": true,
  //         "discountAsset": "BNB",
  //         "discount": "0.75000000"
  //     }
  // }
}

export class accountRateLimitsOrdersMessage extends MessageCardHTML {
  // [
  //   {
  //     "rateLimitType": "ORDERS",
  //     "interval": "SECOND",
  //     "intervalNum": 10,
  //     "limit": 100,
  //     "count": 0
  //   },
  //   {
  //     "rateLimitType": "ORDERS",
  //     "interval": "DAY",
  //     "intervalNum": 1,
  //     "limit": 200000,
  //     "count": 0
  //   }
  // ]
}

export class allOrdersMessage extends MessageCardHTML { }

export class allOrderListsMessage extends MessageCardHTML { }

export class myTradesMessage extends MessageCardHTML { }

export class myPreventedMatchesMessage extends MessageCardHTML { }

export class myAllocationsMessage extends MessageCardHTML { }

export class userDataStreamStartMessage extends MessageCardHTML { }

export class userDataStreamPingMessage extends MessageCardHTML { }

export class userDataStreamStopMessage extends MessageCardHTML { }
