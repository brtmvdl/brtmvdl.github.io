import { HTML, nButton } from '@brtmvdl/frontend'

export class ButtonHTML extends nButton {
  text = ''
  styles = {}
  onclick = (() => ({}))

  constructor(text = '', styles = {}, onclick = (() => ({}))) {
    super()
    this.text = text
    this.styles = styles
    this.onclick = onclick
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setText(this.text)
    this.on('click', () => this.onclick())
  }

  setStyles() {
    Object.keys(this.styles).map((style) => this.setStyle(style, this.styles[style]))
  }
}
