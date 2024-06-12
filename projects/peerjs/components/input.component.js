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
    this.setContainerStyle('padding', '1rem')
    this.setStyle('padding', 'calc(1rem / 2)')
    this.setStyle('width', '100%')
    this.setPlaceholder(this.state.placeholder)
  }

}
