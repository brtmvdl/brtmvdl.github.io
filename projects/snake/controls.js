import { HTML } from '../../assets/js/libs/frontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'

export class Page extends PaddingComponent {
  state = {
    peer: new Peer(),
    conn: null,
  }

  children = {
    input: new InputComponent({ label: 'text' }),
  }

  onCreate() {
    super.onCreate()
    this.setPeerEvents()
    this.append(new TextComponent({ text: 'ball ' + this.getId() }))
    this.append(this.getForm())
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

  getForm() {
    const html = new HTML()
    html.append(this.getInput())
    html.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
    html.append(new ButtonComponent({ text: 'change color', onclick: () => this.onChangeColorButtonClick() }))
    return html
  }

  getInput() {
    return this.children.input
  }

  onSendButtonClick() {
    this.sendMessage({ text: this.children.input.children.input.getValue() })
    this.children.input.children.input.setValue('')
  }

  onChangeColorButtonClick() {
    this.sendMessage({ fn: 'changeColor' })
  }

  sendMessage(message = {}) {
    console.log({ message })
    this.state.conn.send(message)
  }
}
