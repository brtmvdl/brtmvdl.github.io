import { HTML } from '../../assets/js/libs/frontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
// import { ImageComponent } from '../../assets/js/components/image.component.js'
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

  createButton(text) {
    const button = new HTML()
    button.append(this.getImageComponent(text))
    button.addEventListener('contextmenu', (ev) => ev.preventDefault())
    button.addEventListener('mousedown', () => this.onButtonMouseDown({ value: text }))
    button.addEventListener('mouseup', () => this.onButtonMouseUp({ value: text }))
    button.addEventListener('touchstart', () => this.onButtonTouchStart({ value: text }))
    button.addEventListener('touchend', () => this.onButtonTouchEnd({ value: text }))
    button.setStyle('text-align', 'center')
    button.setStyle('padding', '1rem')
    return button
  }

  getImageComponent(arrow) {
    const image = new HTML()
    image.setStyle('background-image', `url('/projects/airplane/images/${arrow}.arrow.png')`)
    image.setStyle('background-size', '1rem')
    image.setStyle('display', 'inline-block')
    image.setStyle('height', '1rem')
    image.setStyle('width', '1rem')
    return image
  }

  startMoving({ message } = {}) {
    this.state.events[message] = setInterval(() => this.dispatch('message', message), 100)
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
