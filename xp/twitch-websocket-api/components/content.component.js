import { HTML } from '@brtmvdl/frontend'
import { TextHTML } from './text.component.js'
import * as str from '../utils/str.js'

export class ContentComponent extends HTML {
  children = {
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getMessages())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getMessages() {
    return this.children.messages
  }

  addMessage(header, ...messages) {
    this.children.messages.prepend(this.createMessageCard(header, ...messages))
  }

  createMessageCard(header, ...messages) {
    const card = new HTML()
    card.append(new TextHTML(header))
    Array.from(messages).map((message) => card.append(new TextHTML(message)))
    Array.from([Date.now()]).map((footer) => card.append(new TextHTML(footer, str.timestamp2str(footer))))
    return card
  }
}
