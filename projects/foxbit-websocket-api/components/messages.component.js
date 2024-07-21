import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { MessageCardComponent } from '../../../assets/js/components/message.card.component.js'
import { MessageModel } from '../../../assets/js/models/message.model.js'

import * as inputs from './input.messages.component.js'
import * as outputs from './output.messages.component.js'

export class MessagesComponent extends HTML {
  children = {
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getMessagesComponent())
  }

  setEvents() {
    this.addEventListener('message', ({ value: data }) => this.onMessage(data))
  }

  onMessage(message = new MessageModel()) {
    this.children.messages.append(this.parseMessageComponent(message))
  }

  parseMessageComponent(message = new MessageModel()) {
    switch (message.Side) {
      case 'input': return this.parseInputMessageComponent(message)
      case 'output': return this.parseOutputMessageComponent(message)
    }

    return new MessageCardComponent(message)
  }

  parseInputMessageComponent(message = new MessageModel()) {
    switch (message.Endpoint) {
      case 'AuthenticateUser': return new inputs.AuthenticateUserMessageCardComponent(message)
      // case 'GetInstruments': return new inputs.GetInstrumentsMessageCardComponent(message)
      // case 'GetProducts': return new inputs.GetProductsMessageCardComponent(message)
    }

    return new MessageCardComponent(message)
  }

  parseOutputMessageComponent(message = new MessageModel()) {
    switch (message.Endpoint) {
      case 'AuthenticateUser': return new outputs.AuthenticateUserMessageCardComponent(message)
      case 'GetInstruments': return new outputs.GetInstrumentsMessageCardComponent(message)
      // case 'GetProducts': return new outputs.GetProductsMessageCardComponent(message)
    }

    return new MessageCardComponent(message)
  }

  getMessagesComponent() {
    return this.children.messages
  }
}
