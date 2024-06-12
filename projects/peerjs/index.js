import { HTML, nFlex } from '@brtmvdl/frontend'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { InputComponent } from './components/input.component.js'
import { ButtonComponent } from './components/button.component.js'
import { TextHTML } from './components/text.component.js'

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
    return (this.getDatetime()).replace(/\W+/ig, '')
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
      // console.log('connection', conn)
      conn.on('data', (data) => console.log('data', data))
      // conn.on('open', () => console.log('open'))
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

    conn.on('error', (err) => console.log('error', peer_id, err))

    conn.on('open', () => {
      console.log('open', peer_id)

      conn.on('data', (data) => {
        console.log('Received', data)
      })

      conn.send(`Hello, i am ${peer_id}!`)
    })

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
    console.log('send click')

    const message = this.children.text_input.getValue()

    Object.keys(this.state.peer.connections).map((conn) => console.log(conn, this.state.peer.connections[conn]))

    this.children.text_input.setValue('')
  }

  onSend({ value: data } = {}) {
    this.addMessage(data.toString())
    this.state.socket.send(data)
  }

  addMessage(message) {
    this.children.messages.prepend(this.createMessageCard('message', message.toString()))
  }

  createMessageCard(header, ...messages) {
    const card = new HTML()
    card.append(new TextHTML(header))
    Array.from(messages).map((message) => card.append(new TextHTML(message)))
    Array.from([Date.now()]).map((footer) => card.append(new TextHTML(footer, str.timestamp2str(footer))))
    this.children.messages.prepend(card)
  }
}
