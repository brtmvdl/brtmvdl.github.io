import { HTML, nButton } from '../../../assets/js/libs/frontend/index.js'

export class ButtonComponent extends nButton {
  state = {
    text: '',
    onclick: (() => { }),
  }

  constructor({ text, onclick = (() => { }) }) {
    super()
    this.state.text = text
    this.state.onclick = onclick
    this.setStyles()
  }

  onCreate() {
    super.onCreate()
    this.setText(this.state.text)
    this.addEventListener('click', () => this.state.onclick?.())
  }

  setStyles() {
    this.setStyle('margin', '0rem 0rem calc(1rem / 2) 0rem')
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('border', '#000000 solid 1px')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('cursor', 'pointer')
    this.setStyle('font', 'inherit')
    this.setStyle('width', '100%')
  }
}
