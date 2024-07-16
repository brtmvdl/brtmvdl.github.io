import * as FRONTEND from '../../../assets/js/libs/frontend/index.js'

export class nInput extends FRONTEND.nInput {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 16) #000000')
    this.setStyle('padding', 'calc(1rem / 4)')
    // this.setStyle('margin', 'calc(1rem / 4)')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
    this.setStyle('width', 'auto')
  }
}
