import { HTML, nFlex } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js'
import { MessageCardComponent } from './message.card.component.js'
import * as input from './input.messages.js'
import * as output from './output.messages.js'

export class MessagesComponent extends HTML {
  children = {
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getMessagesHTML())
  }

  setEvents() {
    this.on('message', (message) => this.onMessage(message))
  }

  getMessagesHTML() {
    return this.children.messages
  }

  onMessage({ value: message = new MessageModel() }) {
    this.children.messages.prepend(this.getMessageCardComponent(message))
  }

  getMessageCardComponent(message = new MessageModel()) {
    switch (message.side) {
      case 'input': return this.getInputMessageCardComponent(message)
      case 'output': return this.getOutputMessageCardComponent(message)
    }

    return new MessageCardComponent(message)
  }

  getInputMessageCardComponent(message = new MessageModel()) {
    switch(message.method) {
      case 'klines': return new input.KlinesInputMessageCardComponent(message)
    }

    return new MessageCardComponent(message)
  }

  getOutputMessageCardComponent(message = new MessageModel()) {
    switch(message.method) {
      case 'klines': return new output.KlinesOutputMessageCardComponent(message)
      case 'klines.close.price': return new output.ClosePriceKlinesOutputMessageCardComponent(message) 
    }

    return new MessageCardComponent(message)
  }
}
