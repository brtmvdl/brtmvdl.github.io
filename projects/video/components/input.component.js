import { HTML, nInput } from '../../../assets/js/libs/frontend/index.js'

export class InputComponent extends nInput {
  state = {
    text: '',
  }

  constructor(text) {
    super()
    this.state.text = text
  }
  
  onCreate() {
    super.onCreate()
    this.setStyle('padding',' calc(1rem / 4) 0rem')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('width','100%')
    this.setPlaceholder(this.state.text)
  }
}
