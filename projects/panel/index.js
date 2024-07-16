import { HTML } from '../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'

export class Page extends PaddingComponent {
  children = {
    left: new HTML(),
    right: new HTML(),
  }

  state = {
    peer: new Peer(),
    numbers: [],
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getColumns())
  }

  setEvents() {
    setInterval(() => this.dispatch('message', { numbers: this.state.numbers }), 500)
    this.setPeerEvents()
  }

  setPeerEvents() {
    this.state.peer.on('open', (data) => this.onPeerOpen(data))
    this.state.peer.on('close', (data) => this.onPeerClose(data))
    this.state.peer.on('error', (data) => this.onPeerError(data))
    this.state.peer.on('connection', (data) => this.onPeerConnection(data))
    this.state.peer.on('disconnected', (data) => this.onPeerDisconnected(data))
  }

  onPeerOpen(data) {
    console.log('on peer open', { data, peer: this.state.peer })
    this.createQrCodeImage()
  }

  createQrCodeImage() {
    console.log('create QrCode Image', this.state.peer._id)
  }

  onPeerConnection(data) {
    console.log('on peer connection', { data, peer: this.state.peer })
    this.setConnectionEvents(data)
  }

  setConnectionEvents(connection) {
    console.log({ connection })
    this.addEventListener('message', ({ value: message }) => connection.send(message))
    connection.on('data', (data) => this.onConnectionData(data))
    connection.on('open', (data) => this.onConnectionOpen(data))
    connection.on('close', (data) => this.onConnectionClose(data))
    connection.on('error', (data) => this.onConnectionError(data))
  }

  onConnectionData(data) {
    console.log('on connection data', { data })
    this.pushNumber(data)
    this.update()
  }

  pushNumber(data) {
    console.log('push number', { data })
    const match = data.match(/n:([0-9]{2})/)
    if (match) this.state.numbers.push(match[1])
  }

  onConnectionOpen(data) {
    console.log('on connection open', { data })
  }

  onConnectionClose(data) {
    console.log('on connection close', { data })
  }

  onConnectionError(data) {
    console.log('on connection error', { data })
  }

  onPeerClose(data) {
    console.log('on peer close', { data, peer: this.state.peer })
  }

  onPeerDisconnected(data) {
    console.log('on peer disconnected', { data, peer: this.state.peer })
  }

  onPeerError(data) {
    console.log('on peer error', { data, peer: this.state.peer })
  }

  getColumns() {
    return new TwoColumnsComponent({
      html1: this.getLeftBar(),
      html2: this.getRightBar(),
    })
  }

  getLeftBar() {
    this.children.left.append(new TextComponent({ text: 'init' }))
    return this.children.left
  }

  getRightBar() {
    this.children.right.append(new TextComponent({ text: 'init' }))
    return this.children.right
  }

  update() {
    this.updateLeft()
    this.updateRight()
  }

  updateLeft() {
    if (this.state.numbers.length > 1) {
      this.children.left.clear()
      const last_numbers = Array.from(this.state.numbers).filter((_, ix) => ix < this.state.numbers.length - 1)
      Array.from(last_numbers).map((text) => this.children.left.append(new TextComponent({ text })))
    }
  }

  updateRight() {
    this.children.right.clear()
    const text = this.state.numbers[this.state.numbers - 1]
    this.children.right.append(new TextComponent({ text }))
  }
}
