import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { MessageModel } from '../../../assets/js/models/message.model.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

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

  onMessage(data = new MessageModel()) {
    console.log('message', data.asJSON())
    this.children.messages.append(new TextComponent({ text: data }))
  }

  getMessagesComponent() {
    return this.children.messages
  }
}
