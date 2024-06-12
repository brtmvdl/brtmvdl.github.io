import { HTML, nButton } from '@brtmvdl/frontend'

export class ButtonComponent extends nButton {
  state = {
    text: '',
    onclick: (() => {}),
  }

  constructor(text, onclick = (() => console.log('no click event'))) {
    super()
    this.state.text = text
    this.state.onclick = onclick
  }

  onCreate() {
    super.onCreate()
    this.setContainerStyle('padding', '1rem')
    this.setStyle('padding', 'calc(1rem / 2)')
    this.setStyle('width', '100%')
    this.setText(this.state.text)
    this.on('click', () => this.state.onclick())
  }
}
