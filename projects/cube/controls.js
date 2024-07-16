import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'

export class Page extends PaddingComponent {
  state = {
    peer: new Peer(),
    conn: null,
    events: {},
  }

  onCreate() {
    super.onCreate()
    this.setPeerEvents()
    this.append(new TextComponent({ text: 'cube ' + this.getId() }))
    this.append(new ButtonComponent({ text: 'click', onclick: () => this.dispatch('message', 'click ' + Date.now()) }))
  }

  setPeerEvents() {
    const id = this.getId()
    this.state.peer.on('open', () => {
      console.log('peer open')
      const conn = this.state.peer.connect(id)
      this.addEventListener('message', ({ value: message }) => conn.send({ fn: message }))
      conn.on('open', () => console.log('conn open', conn))
      conn.on('close', () => console.log('conn close', conn))
      conn.on('error', (err) => console.log('conn error', err, conn))
      console.log({ id, conn })
    })
  }

  getId() {
    return getURLSearchParam('id')
  }
}
