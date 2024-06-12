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
    this.setStyle('padding',' calc(1rem / 2)')
    this.setStyle('border-radius','0rem 1rem 1rem 0rem')
    this.setStyle('background-color', '#eeeeee')
    this.setStyle('text-align','right')
    this.setStyle('line-height','2rem')
    this.setStyle('border','0rem')
    this.setStyle('width','100%')
    this.setText(this.state.text)
    this.on('click', () => this.state.onclick())
  }
}
