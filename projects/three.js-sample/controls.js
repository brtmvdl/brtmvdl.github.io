import { HTML } from '../../assets/js/libs/frontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'

export class Page extends PaddingComponent {
  state = {
    peer: new Peer(),
    conn: null,
  }

  onCreate() {
    super.onCreate()
    this.setPeerEvents()
    this.append(new TextComponent({ text: 'Three.js Sample ' + this.getId() }))
    this.append(new ButtonComponent({ text: 'square color', onclick: () => this.onSquareColorClick() }))
    this.append(new ButtonComponent({ text: 'ball color', onclick: () => this.onBallColorClick() }))
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
  }

  getId() {
    return getURLSearchParam('id')
  }

  onSquareColorClick() {
    this.sendMessage({ fn: 'square_color' })
  }

  onBallColorClick() {
    this.sendMessage({ fn: 'ball_color' })
  }

  sendMessage(message = {}) {
    console.log({ message })
    this.state.conn.send(message)
  }
}
