import { HTML, nFlex } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js'
import { MessageCardComponent } from '../components/message.card.component.js'
import { InputMessageCardComponent } from '../components/input.message.card.component.js'
import { OutputMessageCardComponent } from '../components/output.message.card.component.js'
import { TextComponent } from './text.component.js'

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
      case 'input': return new InputMessageCardComponent(message)
      case 'output': return new OutputMessageCardComponent(message)
    }

    return new MessageCardComponent(message)
  }
}
