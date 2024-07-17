import { HTML } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { MessageModel } from '../../assets/js/models/message.model.js'
import { MessagesComponent } from './components/content.component.js'
import { ConnectComponent } from './components/connect.component.js'
import { SendComponent } from './components/send.component.js'

class SocketMessageModel extends MessageModel {
  Side = 'socket'
}

class OpenMessageModel extends SocketMessageModel {
  constructor(data = {}) {
    super('open', data)
  }
}

class ErrorMessageModel extends SocketMessageModel {
  constructor(error = new Error()) {
    super('error', error)
  }
}

class CloseMessageModel extends SocketMessageModel {
  constructor(data = {}) {
    super('close', data)
  }
}

class OptionsComponent extends HTML { }

export class Page extends PaddingComponent {
  children = {
    connect: new ConnectComponent(),
    options: new OptionsComponent(),
    send: new SendComponent(),
    messages: new MessagesComponent(),
  }

  state = {
    socket: null,
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'socket' }))
    this.append(this.getConnectComponent())
    this.append(this.getOptionsComponent())
    this.append(this.getSendComponent())
    this.append(this.getMessagesComponent())
  }

  getConnectComponent() {
    this.children.connect.addEventListener('connect', (ev) => this.onConnect(ev))
    return this.children.connect
  }

  onConnect(ev) {
    this.state.socket = new io(ev.value)
    this.state.socket.addEventListener('open', (data) => this.onConnectOpen(data))
    this.state.socket.addEventListener('message', (data) => this.onConnectMessage(data))
    this.state.socket.addEventListener('error', (data) => this.onConnectError(data))
    this.state.socket.addEventListener('close', (data) => this.onConnectClose(data))
  }

  onConnectOpen(data) {
    this.dispatchMessage(new OpenMessageModel(data))
  }

  onConnectMessage({ data } = {}) {
    this.dispatchMessage(new MessageModel(data))
  }

  onConnectError(data) {
    this.dispatchMessage(new ErrorMessageModel(data))
  }

  onConnectClose(data) {
    this.dispatchMessage(new CloseMessageModel(data))
  }

  getOptionsComponent() {
    return this.children.options
  }

  getSendComponent() {
    this.children.send.addEventListener('send', (ev) => this.onSend(ev))
    return this.children.send
  }

  onSend({ value: data } = {}) {
    this.dispatchMessage(data.toString())
    this.state.socket.send(data)
  }

  getMessagesComponent() {
    return this.children.messages
  }

  dispatchMessage(message = new MessageModel()) {
    this.children.messages.dispatch('message', message)
  }

}
