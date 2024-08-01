import { HTML } from '../../assets/js/libs/frontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { InputComponent } from './components/input.component.js'
import { createURL, getURLSearchParam } from '../../assets/js/utils/url.js'

export class Page extends PaddingComponent {
  children = {
    peer_id: new LinkComponent({ text: 'chat ' }),
    messages: new HTML(),
    peer_input: new InputComponent('peer id'),
    text_input: new InputComponent('text'),
  }

  state = {
    peer: new Peer(this.createId()),
    conns: [],
  }

  getDatetime(offset = 0) {
    return new Date(Date.now() - offset).toISOString()
  }

  createId() {
    return (this.getDatetime()).replace(/\W+/ig, '').replace(/.+T/, '')
  }

  onCreate() {
    super.onCreate()
    this.setPeerEvents()
    this.append(this.getPeerIdHTML())
    this.append(this.getPeerForm())
    this.append(this.getTextForm())
    this.append(this.getMessagesHTML())
  }

  setPeerEvents() {
    this.state.peer.on('error', (err) => this.onPeerError(err))
    this.state.peer.on('open', (data) => this.onPeerOpen(data))
    this.state.peer.on('connection', (data) => this.onPeerConnection(data))
  }

  onPeerError(error) {
    this.addMessage(`${this.state.peer.id}: error: ${error.message}`)
  }

  onPeerOpen() {
    const { id } = this.state.peer
    this.addMessage(`${id}: open: ${Date.now()}`)
    this.children.peer_id.setText('chat ' + id)
    this.children.peer_id.href(createURL({ search: { id } }))
    this.connect(getURLSearchParam('id'))
  }

  onPeerConnection(conn) {
    this.addMessage(`${conn.peer}: connection: ${Date.now()}`)
    conn.on('error', (err) => this.onConnectionError(conn, err))
    conn.on('open', (data) => this.onConnectionOpen(conn, data))
    conn.on('data', (data) => this.onConnectionData(conn, data))
  }

  onConnectionError(conn, error) {
    this.addMessage(`${conn.peer}: error: ${error.message}`)
  }

  onConnectionOpen(conn, data) {
    this.addMessage(`${conn.peer}: open: ${Date.now()}`)
  }

  onConnectionData(conn, message) {
    this.addMessage(`${conn.peer}: data: ${message}`)
  }

  getPeerIdHTML() {
    return this.children.peer_id
  }

  getPeerForm() {
    return new TwoColumnsComponent({ html1: this.getPeerIdInput(), html2: this.getConnectButton(), widths: ['79%', '20%'] })
  }

  getPeerIdInput() {
    return this.children.peer_input
  }

  getConnectButton() {
    return new ButtonComponent({ text: 'connect', onclick: () => this.onConnectButtonClick() })
  }

  onConnectButtonClick() {
    const peer_id = this.children.peer_input.getValue()

    const conn = this.state.peer.connect(peer_id)

    conn.on('open', () => {
      this.state.conns.push(conn)
      conn.send('hello')
      this.addMessage(`${peer_id}: open: ${Date.now()}`)
    })

    conn.on('data', (data) => {
      this.addMessage(`${peer_id}: data: ${data}`)
    })

    conn.on('error', (err) => {
      this.addMessage(`${peer_id}: error: ${err.message}`)
    })
  }

  createMessage(message, header = 'message', footer = Date.now()) {
    return [header, message, footer]
  }

  getMessagesHTML() {
    this.children.messages.setStyle('padding', 'calc(1rem / 4) 0rem')
    return this.children.messages
  }

  getTextForm() {
    return new TwoColumnsComponent({ html1: this.getTextInput(), html2: this.getSendButton(), widths: ['79%', '20%'] })
  }

  getTextInput() {
    return this.children.text_input
  }

  getSendButton() {
    return new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
  }

  onSendButtonClick() {
    const message = this.children.text_input.getValue()
    Array.from(this.state.conns).map((conn) => conn.send(message))
    this.addMessage(`${this.state.peer.id}: message: ${message}`)
    this.children.text_input.setValue('')
  }

  addMessage(text) {
    this.children.messages.prepend(new TextComponent({ text }))
  }

  connect(id) {
    if (id) this.state.peer.connect(id)
  }
}
