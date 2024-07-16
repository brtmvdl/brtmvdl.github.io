import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class CursorComponent extends HTML {

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('display', 'inline-block')
    this.setStyle('text-align', 'center')
    this.setStyle('line-height', '3rem')
    this.setStyle('margin', '1rem')
    this.setStyle('height', '3rem')
    this.setStyle('width', '3rem')
    this.down()
  }

  up() {
    this.setStyle('background-color', 'rgb(255, 255, 255)')
    this.setStyle('color', 'rgb(0, 0, 0)')
  }

  down() {
    this.setStyle('background-color', 'rgb(0, 0, 0)')
    this.setStyle('color', 'rgb(255, 255, 255)')
  }
}
