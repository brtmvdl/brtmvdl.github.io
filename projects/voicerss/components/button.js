import * as FRONTEND from '@brtmvdl/frontend'

export class nButton extends FRONTEND.nButton {
  state = {
    text: '',
    onclick: (() => { }),
  }

  constructor(text, onclick = (() => console.log('click'))) {
    super()
    this.state.text = text
    this.state.onclick = onclick
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setText(this.state.text)
    this.on('click', () => this.state.onclick?.())
  }

  setStyles() {
    this.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 16) #000000')
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('margin', 'calc(1rem / 4)')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
    this.setStyle('width', '100%')
  }

}
