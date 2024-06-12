import { HTML, nFlex } from '@brtmvdl/frontend'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { ButtonComponent, TextHTML, InputComponent, MessageCardComponent } from './components/index.js'
import * as str from '../../assets/js/utils/str.js'

export class Page extends HTML {
  children = {
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
    this.state.peer.on('error', (err) => console.error('error', err))

    this.state.peer.on('connection', (conn) => {
      console.log('connection', { conn })

      conn.on('data', (message) => {
        console.log('data', { message })

        this.addMessage(`${conn.peer}: message: ${message}`)
      })
    })

    this.state.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia(
        { video: true, audio: true },
        (stream) => {
          call.answer(stream)
          call.on('stream', (remoteStream) => console.log('stream', 'remoteStream', remoteStream))
        },
        (err) => console.error('error', err),
      )
    })
  }

  getPeerIdHTML() {
    const html = new HTML()
    this.state.peer.on('open', () => html.setText('PEER ID: ' + this.state.peer.id))
    html.setStyle('margin', '1rem')
    return html
  }

  getPeerForm() {
    return this.createFlex(this.getPeerIdInput(), this.getConnectButton())
  }

  getPeerIdInput() {
    return this.children.peer_input
  }

  getConnectButton() {
    return new ButtonComponent('connect', () => this.onConnectButtonClick())
  }

  onConnectButtonClick() {
    const peer_id = this.children.peer_input.getValue()

    const conn = this.state.peer.connect(peer_id)

    conn.on('open', () => {
      console.log('open', {})

      this.state.conns.push(conn)
      conn.send('hello')
      this.addMessage(`${peer_id}: open: ${Date.now()}`)
    })

    conn.on('data', (data) => {
      console.log('data', { data })

      this.addMessage(`${peer_id}: data: ${data}`)
    })

    conn.on('error', (err) => {
      console.log('error', { err })

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
    html.append(component1.setContainerStyle('width', '80%'))
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
    return new ButtonComponent('send', () => this.onSendButtonClick())
  }

  onSendButtonClick() {
    const message = this.children.text_input.getValue()
    Array.from(this.state.conns).map((conn) => conn.send(message))
    this.addMessage(`${this.state.peer.id}: message: ${message}`)
    this.children.text_input.setValue('')
  }

  addMessage(message) {
    this.children.messages.prepend(new TextHTML(message))
  }

}
