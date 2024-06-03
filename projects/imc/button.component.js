import { HTML, nButton } from '@brtmvdl/frontend'

export class ButtonComponent extends nButton {
  state = {
    text: '',
    onclick: (() => ({})),
  }

  constructor(text, onclick = (() => ({}))) {
    super()
    this.state.text = text
    this.state.onclick = onclick
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setText(this.state.text)
    this.on('click', () => this.state.onclick())
  }

  setStyles() {
    this.setStyle('display', 'inline-block')
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('width', '100%')
  }
}
