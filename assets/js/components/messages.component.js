import { HTML, nFlex } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js'
import { MessageCardComponent } from '../components/message.card.component.js'

export class MessagesComponent extends HTML {
  children = {
    messages: new HTML(),
  }

  getName() { return 'messages-component' }

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
    return new MessageCardComponent(message)
  }
}
