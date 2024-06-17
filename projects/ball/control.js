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
    this.append(this.getButton('left'))
    this.append(this.getButton('right'))
    this.append(this.getButton('up'))
    this.append(this.getButton('down'))
  }

  setPeerEvents() {
    this.state.conn = this.state.peer.connect(this.getId())
    this.state.peer.on('open', () => console.log('open'))
    this.state.peer.on('error', () => console.log('error'))
    this.state.peer.on('close', () => console.log('close'))
  }

  getId() {
    const url = new URL(window.location)
    return +url.searchParams.get('id')
  }

  getButton(text) {
    return createButton(text, () => this.state.conn.send(text))
  }
}
