import { HTML } from '@brtmvdl/frontend'

export class CardHTML extends HTML {
  getName() { return 'card' }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('border', '1px solid rgba(0, 0, 0, 0.176)')
    this.setStyle('border-radius', 'calc(1rem / 2)')
    this.setStyle('margin', '0rem 0rem 1rem 0rem')
    this.setStyle('overflow-wrap', 'break-word')
    this.setStyle('text-size-adjust', '100%')
    this.setStyle('color', 'rgb(33, 37, 41)')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('flex-direction', 'column')
    this.setStyle('text-align', 'start')
    this.setStyle('display', 'flex')
  }
}
