import { HTML } from '@brtmvdl/frontend'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { createButton } from '../../assets/js/utils/components.js'

export class Page extends HTML {
  state = {
    peer: new Peer(),
    conn: null,
  }

  onCreate() {
    super.onCreate()
    this.setPeerEvents()
    this.append(this.getIdHTML())
    this.append(this.getButton('changeColor'))
    this.append(this.getButton('changeFont'))
    this.append(this.getButton('changeWeight'))
    this.append(this.getButton('changeBevel'))
  }

  setPeerEvents() {
    const id = this.getId()
    this.state.peer.on('open', () => {
      console.log('peer open')
      const conn = this.state.peer.connect(id)
      this.state.conn = conn
      conn.on('open', () => console.log('conn open'))
      conn.on('close', () => console.log('conn close'))
      conn.on('error', (err) => console.log('conn error', err))
      console.log({ id, conn })
    })
    // this.state.peer.on('connection', () => console.log('peer connection'))
    // this.state.peer.on('disconnected', () => console.log('peer disconnected'))
    this.state.peer.on('close', () => console.log('peer close'))
    this.state.peer.on('error', (err) => console.log('peer error', err))
  }

  getIdHTML() {
    const html = new HTML()
    html.setText(this.getId())
    return html
  }

  getId() {
    const url = new URL(window.location)
    return url.searchParams.get('id')
  }

  getButton(text) {
    return createButton(text, () => this.sendMessage(text))
  }

  sendMessage(message = '') {
    console.log({ message })
    this.state.conn.send(message)
  }
}
