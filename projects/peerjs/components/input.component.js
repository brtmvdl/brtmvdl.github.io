import { HTML, nInput } from '@brtmvdl/frontend'

export class InputComponent extends nInput {
  state = {
    placeholder: '',
  }

  constructor(placeholder) {
    super()
    this.state.placeholder = placeholder
  }

  onCreate() {
    super.onCreate()
    this.setStyle('padding',' calc(1rem / 2) 0rem calc(1rem / 2) calc(1rem / 2)')
    this.setStyle('border-radius','1rem 0rem 0rem 1rem')
    this.setStyle('background-color', '#eeeeee')
    this.setStyle('line-height','2rem')
    this.setStyle('border','0rem')
    this.setStyle('width','100%')
    this.setPlaceholder(this.state.placeholder)
  }
}
