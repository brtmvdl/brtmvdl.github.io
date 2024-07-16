import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import * as str from '../../../assets/js/utils/str.js'

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
    card.append(new TextComponent(header))
    Array.from(messages).map((message) => card.append(new TextComponent(message)))
    Array.from([Date.now()]).map((footer) => card.append(new TextComponent(footer, str.timestamp2str(footer))))
    return card
  }
}
