import { HTML } from '@brtmvdl/frontend'

export class Top extends HTML {
  onCreate() {
    super.onCreate()
    this.setText('brtmvdl')
    this.setStyles()
  }

  setStyles() {
    this.setStyle('background-color', '#000000')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    this.setStyle('padding', '1rem')
    this.setStyle('color', '#ffffff')
  }
}
