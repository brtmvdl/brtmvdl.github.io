import { HTML, nInput } from '../../../assets/js/libs/frontend/index.js'

export class AmountInputComponent extends nInput {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setContainerStyle('text-align', 'center')
    this.setStyle('background-color', 'transparent')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    this.setStyle('padding', '1rem')
    this.setStyle('border', 'none')
  }
}
