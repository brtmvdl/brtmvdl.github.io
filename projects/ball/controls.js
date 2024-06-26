import { HTML } from '@brtmvdl/frontend'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'

export class Page extends HTML {
  state = {
    peer: new Peer(),
    conn: null,
  }

  children = {
    input: new InputComponent('text'),
  }

  onCreate() {
    super.onCreate()
    this.setPeerEvents()
    this.append(this.getIdHTML())
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

  getIdHTML() {
    const html = new HTML()
    html.setStyle('text-align', 'center')
    html.setStyle('padding', '1rem')
    html.setText(this.getId())
    return html
  }

  getId() {
    const url = new URL(window.location)
    return url.searchParams.get('id')
  }

  getForm() {
    const html = new HTML()
    html.setStyle('padding', '1rem')
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
