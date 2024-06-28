import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js'

export class MessagesComponent extends HTML {
  children = {
    messages: [],
  }

  constructor(messages = []) {
    super()
    this.children.messages = messages
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('message', ({ value: data }) => this.onMessage(data))
  }

  onMessage(message = new MessageModel()) {
    this.prepend(this.getMessageHTML(message.request?.name, message))
  }

  getMessageHTML(name, data) {
    return new HTML()
  }
}
