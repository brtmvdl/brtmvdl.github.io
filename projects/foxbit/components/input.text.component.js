import { HTML, nInputText } from '@brtmvdl/frontend'

export class InputTextComponent extends nInputText {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('background-color', 'rgba(0, 0, 0, 0)')
    this.setStyle('border-radius', 'calc(1rem / 2)')
    this.setStyle('padding', 'calc(1rem / 2) 0rem')
    this.setStyle('margin', 'calc(1rem / 2) 0rem')
    this.setStyle('border', '#000000 solid 1px')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('cursor', 'pointer')
    this.setStyle('color', '#000000')
    this.setStyle('font', 'inherit')
    this.setStyle('width', '100%')
  }
}
