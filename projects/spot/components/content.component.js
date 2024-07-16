import { HTML, nFlex } from '../../../assets/js/libs/frontend/index.js'
import { FormComponent } from './form.component.js'
import { MessagesComponent } from './messages.component.js'

export class ContentComponent extends HTML {
  children = {
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  state = {
    socket: this.getWebSocket()
  }

  getWebSocket() {
    const ws = new WebSocket('wss://ws.bitget.com/v2/ws/public')
    ws.addEventListener('open', (data) => this.onSocketOpen(data))
    ws.addEventListener('message', (data) => this.onSocketMessage(data))
    ws.addEventListener('error', (data) => this.onSocketError(data))
    ws.addEventListener('close', (data) => this.onSocketClose(data))
    return ws
  }

  onSocketOpen(data) {
    console.log('onSocketOpen', { data })
  }

  onSocketMessage(data) {
    console.log('onSocketMessage', { data })
  }

  onSocketError(data) {
    console.log('onSocketError', { data })
  }

  onSocketClose(data) {
    console.log('onSocketClose', { data })
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFormComponent())
    flex.append(this.getMessagesComponent())
    return flex
  }

  getFormComponent() {
    this.children.form.addEventListener('start', (ev) => this.onStart(ev))
    this.children.form.addEventListener('change', (ev) => this.onChange(ev))
    return this.children.form
  }

  onStart(ev) {
    const message = { "op": "subscribe", "args": [{ "instType": "SPOT", "channel": "candle1m", "instId": ev.value }] }
    this.state.socket.send(JSON.stringify(message))
    this.children.messages.dispatch('message', message)
  }

  onChange(ev) {
    console.log('onChange', ev)
  }

  getMessagesComponent() {
    return this.children.messages
  }
}
