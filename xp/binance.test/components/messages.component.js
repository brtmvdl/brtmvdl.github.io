import { HTML, nFlex } from '@brtmvdl/frontend'
import { TextComponent } from './text.component.js'

export class MessagesComponent extends HTML {
  children = {
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
  }

  setEvents() {
    this.on('message', (message) => this.onMessage(message))
  }

  onMessage({ value: message }) {
    console.log('onMessage', { message })
  }
}
