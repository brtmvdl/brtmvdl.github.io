import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class CardBodyComponent extends HTML {
  getName() { return 'card-body-component' }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setContainerStyle('border-bottom', '1px solid rgba(0, 0, 0, 0.176)')
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('text-size-adjust', '100%')
    this.setStyle('text-align', 'start')
    this.setStyle('display', 'block')
    this.setStyle('flex-shrink', '1')
    this.setStyle('flex-grow', '1')
  }
}
