import { HTML, nFlex, nButton, nInputTextGroup } from '../../assets/js/libs/frontend/index.js'
import { TitleComponent } from './components/title.js'
import { MessageComponent } from './components/message.js'
import { MessageModel } from './models/message.js'

export class Page extends HTML {
  children = {
    nick: new nInputTextGroup(),
    channel: new nInputTextGroup(),
    message: new nInputTextGroup(),
    messages: new HTML(),
  }

  state = {
    access_token: this.getValueByUrlHash(),
    socket: this.createSocketConnection()
  }

  getValueByUrlHash() {
    const url = new URL(window.location)
    const search = new URLSearchParams(url.hash.replace('#', ''))
    return search.get('access_token')
  }

  createSocketConnection() {
    const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443')
    ws.addEventListener('open', (data) => this.onSocketOpen(data))
    ws.addEventListener('message', (data) => this.onSocketMessage(data))
    ws.addEventListener('close', (data) => this.onSocketClose(data))
    ws.addEventListener('error', (data) => this.onSocketError(data))
    return ws
  }

  onSocketOpen(data) {
    this.addMessage(new MessageModel(`opened: ${data.timeStamp}`))
  }

  onSocketMessage({ data }) {
    this.addMessage(new MessageModel(data))
  }

  onSocketClose(data) {
    this.addMessage(new MessageModel(`closed`, data))
  }

  onSocketError(data) {
    this.addMessage(new MessageModel(`error`, data))
  }

  onCreate() {
    this.append(new TitleComponent('Twitch API', 'https://dev.twitch.tv/docs/api/get-started/'))
    this.append(this.getButtonsFlex())
    this.append(this.getNickInput())
    this.append(this.getChannelInput())
    this.append(this.getMessageInput())
    this.append(this.getSendButton())
    this.append(this.getMessagesHTML())
  }

  getButtonsFlex() {
    const flex = new nFlex()
    flex.append(this.getSendCapMessageButton())
    flex.append(this.getSendPassMessageButton())
    flex.append(this.getSendNickMessageButton())
    return flex
  }

  createSendMessageButton(text, onMessage = (() => '')) {
    const button = new nButton()
    button.setText(text)
    button.addEventListener('click', () => this.socketSend(onMessage()))
    return button
  }

  getSendCapMessageButton() {
    return this.createSendMessageButton('send cap', () => 'CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands')
  }

  getSendPassMessageButton() {
    return this.createSendMessageButton('send pass', () => `PASS oauth:${this.state.access_token}`)
  }

  getSendNickMessageButton() {
    return this.createSendMessageButton('send nick', () => `NICK ${this.children.nick.children.input.getValue()}`)
  }

  getNickInput() {
    this.children.nick.children.label.setText('nick')
    this.children.nick.children.input.setPlaceholder('nick')
    return this.children.nick
  }

  getChannelInput() {
    this.children.channel.children.label.setText('channel')
    this.children.channel.children.input.setPlaceholder('channel')
    return this.children.channel
  }

  getMessageInput() {
    this.children.message.children.label.setText('message')
    this.children.message.children.input.setPlaceholder('message')
    return this.children.message
  }

  getSendButton() {
    const button = new nButton()
    button.setText('send')
    button.addEventListener('click', () => this.onButtonClick())
    return button
  }

  onButtonClick() {
    const channel = this.children.channel.children.input.getValue()
    const message = this.children.message.children.input.getValue()
    this.socketSend(`PRIVMSG #${channel} :${message}`)
    this.children.message.children.input.setValue('')
  }

  addMessage(message = new MessageModel()) {
    console.log('addMessage', message)
    this.children.messages.append(new MessageComponent(message))
  }

  getMessagesHTML() {
    return this.children.messages
  }

  socketSend(message = '') {
    console.log({ message })
    this.state.socket.send(message)
  }

}
