import * as FRONTEND from '@brtmvdl/frontend'

export class ButtonComponent extends FRONTEND.nButton {
  state = {
    text: '',
    onclick: (() => { }),
  }

  constructor(text, onclick = (() => { })) {
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
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('cursor', 'pointer')
    this.setStyle('width', '100%')
  }
}
