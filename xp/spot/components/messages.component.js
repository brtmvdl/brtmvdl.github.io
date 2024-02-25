import { HTML } from '@brtmvdl/frontend'

export class MessagesComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
  }

  setEvents() {
    this.on('message', (ev) => this.onMessage(ev))
  }

  onMessage(ev) {
    console.log('onMessage', ev)
  }
}
