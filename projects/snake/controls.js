import { HTML } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'

export class Page extends PaddingComponent {
  state = {
    keys: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
    id: getURLSearchParam('id'),
    conn: null,
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getButtons())
    this.createNewPeer()
  }

  createNewPeer() {
    const peer = createNewPeer('snake')
    peer.on('open', () => this.state.conn = peer.connect(this.state.id))
  }

  sendKey(key) {
    if (this.state.keys.includes(key)) this.state.conn?.send(key)
  }

  setEvents() {
    window.addEventListener('keyup', ({ key }) => this.sendKey(key))
  }

  getButtons() {
    const buttons = new HTML()
    Array.from(this.state.keys).map((key) => buttons.append(this.createButton(key)))
    return buttons
  }

  createButton(key) {
    return new ButtonComponent({ text: key, onclick: () => this.sendKey(key) })
  }
}
