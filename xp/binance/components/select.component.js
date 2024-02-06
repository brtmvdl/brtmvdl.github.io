import { HTML, nSelect } from '@brtmvdl/frontend'

export class SelectComponent extends nSelect {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('background-color', 'rgba(0, 0, 0, 0)')
    this.setStyle('margin', 'calc(1rem / 2) 0rem')
    this.setStyle('border', '#000000 solid 1px')
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('border-radius', '6px')
    this.setStyle('color', '#000000')
    this.setStyle('font', 'inherit')
    this.setStyle('outline', 'none')
    this.setStyle('width', '100%')
  }
}
