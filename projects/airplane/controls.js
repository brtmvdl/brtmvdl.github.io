import { HTML } from '@brtmvdl/frontend'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
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
    this.append(new TextComponent({ text: 'airplane ' + this.getId() }))
    this.append(new TwoColumnsComponent({
      html1: this.createButton('up'),
      html2: this.createButton('down'),
      widths: ['50%', '50%'],
    }))
    this.append(new TwoColumnsComponent({
      html1: this.createButton('left'),
      html2: this.createButton('right'),
      widths: ['50%', '50%'],
    }))
    this.append(new TwoColumnsComponent({
      html1: this.createButton('front'),
      html2: this.createButton('back'),
      widths: ['50%', '50%'],
    }))
  }

  setPeerEvents() {
    const id = this.getId()
    this.state.peer.on('open', () => {
      console.log('peer open')
      const conn = this.state.peer.connect(id)
      this.on('message', ({ value: message }) => conn.send({ fn: message }))
      conn.on('open', () => console.log('conn open', conn))
      conn.on('close', () => console.log('conn close', conn))
      conn.on('error', (err) => console.log('conn error', err, conn))
      console.log({ id, conn })
    })
  }

  getId() {
    return getURLSearchParam('id')
  }

  createButton(text) {
    const button = new HTML()
    button.append(new TextComponent({ text }))
    button.on('mousedown', () => this.onButtonMouseDown({ value: text }))
    button.on('mouseup', () => this.onButtonMouseUp({ value: text }))
    button.on('touchstart', () => this.onButtonTouchStart({ value: text }))
    button.on('touchend', () => this.onButtonTouchEnd({ value: text }))
    button.setStyle('text-align', 'center')
    button.setStyle('padding', '1rem')
    return button
  }

  startMoving({ message } = {}) {
    this.state.events[message] = setInterval(() => this.dispatchEvent('message', message), 100)
  }

  stopMoving({ message } = {}) {
    clearInterval(this.state.events[message])
  }

  onButtonMouseDown({ value: message }) {
    console.log('on mouse down', { message })
    this.startMoving({ message })
  }

  onButtonMouseUp({ value: message }) {
    console.log('on mouse up', { message })
    this.stopMoving({ message })
  }

  onButtonTouchStart({ value: message }) {
    console.log('on Button Touch Start', { message })
    this.startMoving({ message })
  }

  onButtonTouchEnd({ value: message }) {
    console.log('on Button Touch End', { message })
    this.stopMoving({ message })
  }

}
