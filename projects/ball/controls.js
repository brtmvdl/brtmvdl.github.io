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
    this.append(this.getInput())
    this.append(this.getSendButton())
    this.append(this.getChangeColorButton())
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
    html.setStyle('background-color', '#000000')
    html.setStyle('text-align', 'center')
    html.setStyle('color', '#ffffff')
    html.setStyle('padding', '1rem')
    html.setText(this.getId())
    return html
  }

  getId() {
    const url = new URL(window.location)
    return url.searchParams.get('id')
  }

  getInput() {
    this.children.input.children.label.setStyle('margin', '1rem 0rem 0rem 0rem')
    this.children.input.children.label.setStyle('border-radius', '1rem')
    this.children.input.children.label.setStyle('padding', '1rem')

    this.children.input.children.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    this.children.input.children.input.setStyle('margin', '0rem 1rem')
    this.children.input.children.input.setStyle('border-radius', '1rem')
    this.children.input.children.input.setStyle('padding', '1rem')
    this.children.input.children.input.setStyle('border', 'none')

    return this.children.input
  }

  getSendButton() {
    return new ButtonComponent('send', () => {
      const text = this.children.input.children.input.getValue()
      this.sendMessage({ text })
      this.children.input.children.input.setValue('')
    })
  }

  getChangeColorButton() {
    return new ButtonComponent('changeColor', () => this.sendMessage({ fn: 'changeColor' }))
  }

  sendMessage(message = {}) {
    console.log({ message })
    this.state.conn.send(message)
  }
}
