import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { TextHTML } from '../text.html.js'
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
    this.append(this.getHeaderHTML())
    this.append(this.getBody())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.setText(this.data.Endpoint)
    return header
  }

  getBody() {
    switch (this.data.Side) {
      case 'input': return this.getInputBodyHTML()
      case 'output': return this.getOutputBodyHTML()
      case 'socket': return this.getSocketBodyHTML()
    }

    return new this.getBodyHTML()
  }

  getSocketBodyHTML() { return this.getBodyHTML() }

  getInputBodyHTML() { return this.getBodyHTML() }

  getOutputBodyHTML() { return this.getBodyHTML() }

  getBodyHTML() {
    const body = new CardBodyHTML()
    body.setText(JSON.stringify(this.data))
    return body
  }

  getFooterHTML() {
    const footer = new CardFooterHTML()
    footer.append(new TextHTML(str.datetime2str(this.data.id)), this.data.id)
    return footer
  }
}

export class tableMessage extends MessageCardHTML {
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
    table.setStyle('padding', 'calc(1rem / 2)')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}

export class emptyMessage extends MessageCardHTML {
  getBodyHTML() {
    return new HTML()
  }
}

export class logMessage extends MessageCardHTML { }

export class openMessage extends emptyMessage { }

export class closeMessage extends emptyMessage { }

export class AuthenticateUserMessage extends MessageCardHTML { }

export class Authenticate2FAMessage extends MessageCardHTML { }

export class LogoutMessage extends MessageCardHTML { }

export class GetUserInfoMessage extends MessageCardHTML { }

export class GetUserPermissionsMessage extends MessageCardHTML { }

export class GetWithdrawTicketsMessage extends MessageCardHTML { }

export class GetDepositTicketsMessage extends MessageCardHTML { }

export class GetInstrumentMessage extends MessageCardHTML {
  getInputBodyHTML() {
    const { InstrumentId } = this.data.Payload
    const body = new CardBodyHTML()
    body.append(new TextHTML(`InstrumentId: ${InstrumentId}`))
    return body
  }
}

export class GetInstrumentsMessage extends MessageCardHTML { }

export class GetProductsMessage extends MessageCardHTML { }

export class GetL2SnapshotMessage extends MessageCardHTML { }

export class GetTickerHistoryMessage extends MessageCardHTML { }

export class SubscribeAccountEventsMessage extends MessageCardHTML { }

export class SubscribeLevel1Message extends MessageCardHTML {
  getBodyHTML() {
    const { OMSId, InstrumentId, MarketId, BestBid, BestOffer, LastTradedPx, LastTradedQty, LastTradeTime, SessionOpen, SessionHigh, SessionLow, SessionClose, Volume, CurrentDayVolume, CurrentDayNumTrades, CurrentDayPxChange, Rolling24HrVolume, Rolling24NumTrades, Rolling24HrPxChange, TimeStamp, } = this.data.Payload
    const body = new CardBodyHTML()
    body.append(new TextHTML(`OMSId: ${OMSId}`))
    body.append(new TextHTML(`InstrumentId: ${InstrumentId}`))
    body.append(new TextHTML(`MarketId: ${MarketId}`))
    body.append(new TextHTML(`BestBid: ${BestBid}`))
    body.append(new TextHTML(`BestOffer: ${BestOffer}`))
    body.append(new TextHTML(`LastTradedPx: ${LastTradedPx}`))
    body.append(new TextHTML(`LastTradedQty: ${LastTradedQty}`))
    body.append(new TextHTML(`LastTradeTime: ${LastTradeTime}`))
    body.append(new TextHTML(`SessionOpen: ${SessionOpen}`))
    body.append(new TextHTML(`SessionHigh: ${SessionHigh}`))
    body.append(new TextHTML(`SessionLow: ${SessionLow}`))
    body.append(new TextHTML(`SessionClose: ${SessionClose}`))
    body.append(new TextHTML(`Volume: ${Volume}`))
    body.append(new TextHTML(`CurrentDayVolume: ${CurrentDayVolume}`))
    body.append(new TextHTML(`CurrentDayNumTrades: ${CurrentDayNumTrades}`))
    body.append(new TextHTML(`CurrentDayPxChange: ${CurrentDayPxChange}`))
    body.append(new TextHTML(`Rolling24HrVolume: ${Rolling24HrVolume}`))
    body.append(new TextHTML(`Rolling24NumTrades: ${Rolling24NumTrades}`))
    body.append(new TextHTML(`Rolling24HrPxChange: ${Rolling24HrPxChange}`))
    body.append(new TextHTML(`TimeStamp: ${TimeStamp}`, str.datetime2str(TimeStamp)))
    return body
  }
}

export class UnsubscribeLevel1Message extends MessageCardHTML { }

export class SubscribeLevel2Message extends MessageCardHTML { }

export class UnsubscribeLevel2Message extends MessageCardHTML { }

export class SubscribeLevel1MarketsMessage extends MessageCardHTML { }

export class SubscribeTickerMessage extends MessageCardHTML { }

export class UnsubscribeTickerMessage extends MessageCardHTML { }

export class SubscribeTradesMessage extends MessageCardHTML { }

export class UnsubscribeTradesMessage extends MessageCardHTML { }

export class SendOrderMessage extends MessageCardHTML { }

export class GetOrderFeeMessage extends MessageCardHTML { }

export class GetTradesHistoryMessage extends MessageCardHTML { }

export class CancelOrderMessage extends MessageCardHTML { }

export class GetOrderHistoryMessage extends MessageCardHTML { }

export class GetOrderStatusMessage extends MessageCardHTML { }

export class GetOpenOrdersMessage extends MessageCardHTML { }

export class CancelAllOrdersMessage extends MessageCardHTML { }

export class GetAccountInfoMessage extends MessageCardHTML { }

export class GetAccountPositionsMessage extends MessageCardHTML { }

export class GetAccountTradesMessage extends MessageCardHTML { }
