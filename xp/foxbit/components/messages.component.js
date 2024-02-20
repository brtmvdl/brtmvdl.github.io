import { HTML } from '@brtmvdl/frontend'
import * as messages from './messages/index.js'

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
    this.children.list.append(this.getMessageComponent(data))
  }

  getMessageComponent(data) {
    switch(data.method) {
      case '/currencies': return new messages.CurrenciesMessageComponent(data)
      case '/error': return new messages.ErrorMessageComponent(data)
    }

    return new HTML()
  }

  getMessagesList() {
    return this.children.list
  }
}
