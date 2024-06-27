import { HTML, nFlex } from '@brtmvdl/frontend'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from './components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

export class Page extends HTML {
  children = {
    peer_id: new TextComponent({ text: 'PEER ID: ' }),
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

  onPeerError(conn, error) {
    this.addMessage(`${this.state.peer.id}: error: ${error.message}`)
  }

  onPeerOpen() {
    const { id } = this.state.peer
    this.addMessage(`${id}: open: ${Date.now()}`)
    this.children.peer_id.setText('PEER ID: ' + id)
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
    this.children.peer_id.setStyle('margin', '1rem')
    return this.children.peer_id
  }

  getPeerForm() {
    return this.createFlex(this.getPeerIdInput(), this.getConnectButton())
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
    this.children.messages.setStyle('padding', '1rem')
    return this.children.messages
  }

  createFlex(component1, component2) {
    const html = new nFlex()
    html.setStyle('padding', '1rem')
    html.append(component1.setContainerStyle('width', '79%'))
    html.append(component2.setContainerStyle('width', '20%'))
    return html
  }

  getTextForm() {
    return this.createFlex(this.getTextInput(), this.getSendButton())
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

}
