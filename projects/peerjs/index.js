import { HTML, nFlex } from '@brtmvdl/frontend'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { InputComponent } from './components/input.component.js'
import { ButtonComponent } from './components/button.component.js'
import { TextHTML } from './components/text.component.js'
import * as str from '../../assets/js/utils/str.js'

export class Page extends HTML {
  children = {
    messages: new HTML(),
    peer_input: new InputComponent('peer id'),
    text_input: new InputComponent('text'),
  }

  state = {
    socket: null,
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
      conn.on('data', (data) => this.addMessages(conn.peer, data))
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

    console.log('connect click', peer_id)

    const conn = this.state.peer.connect(peer_id)

    conn.on('open', () => {
      this.state.conns.push(conn)
      conn.send(`Hello, i am ${peer_id}!`)
    })

    conn.on('data', (data) => this.addMessages(`message: ${peer_id}`, data))

    conn.on('error', (err) => this.addMessages(`error: ${peer_id}`, err.message))
  }

  getMessagesHTML() {
    return this.children.messages
  }

  createFlex(component1, component2) {
    const html = new nFlex()
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

    Array.from(this.state.conns).map((conn) => console.log(conn.send(message)))

    this.children.text_input.setValue('')
  }

  addMessages(header, ...messages) {
    const card = new HTML()
    card.append(new TextHTML(header))
    Array.from(messages).map((message) => card.append(new TextHTML(message)))
    Array.from([Date.now()]).map((footer) => card.append(new TextHTML(footer, str.timestamp2str(footer))))
    this.children.messages.prepend(card)
  }
}
