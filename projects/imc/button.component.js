import { HTML, nButton } from '@brtmvdl/frontend'
import { getParams } from './params.js'

export class ButtonComponent extends nButton {
  state = {
    text: '',
    onclick: (() => ({})),
    params: getParams()
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
    this.setStyle('background-color', this.state.params.bgcolor)
    this.setStyle('box-shadow', '0rem 0rem 0rem 1px #000000')
    this.setStyle('color', this.state.params.color)
    this.setStyle('margin', 'calc(1rem / 4) 0')
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('display', 'inline-block')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }
}
