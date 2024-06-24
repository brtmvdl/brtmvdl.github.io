import { HTML } from '@brtmvdl/frontend'
import * as messages from './messages/index.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class MessagesComponent extends HTML {
  children = {
    list: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getMessagesList())
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  onMessage({ value: data } = {}) {
    this.children.list.prepend(this.getMessageComponent(data))
  }

  getMessageComponent(data) {
    switch (data.request.url) {
      case '/currencies': return new messages.CurrenciesMessageComponent(data)
      case '/markets': return new messages.MarketsMessagesComponent(data)
      case '/markets/quotes': return new messages.MarketsQuotesMessagesComponent(data)
      case '/markets/{market_symbol}/orderbook': return new messages.MarketsMarketSymbolOrderbookMessagesComponent(data)
      case '/markets/{market_symbol}/candlesticks': return new messages.MarketsMarketSymbolCandlesticksMessagesComponent(data)
      case '/banks': return new messages.BanksMessagesComponent(data)
      case '/system/time': return new messages.SystemTimeMessagesComponent(data)
      case '/error': return new messages.ErrorMessageComponent(data)
    }

    return new TextComponent(JSON.stringify(data))
  }

  getMessagesList() {
    return this.children.list
  }

}
