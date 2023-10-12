import { HTML } from '../index.js'
import * as COLORS from '../utils/colors.js'
import SCREEN from '../components/screen.js'

export class MenuComponent extends HTML {
  getName() {
    return 'menu'
  }

  onCreate() {
    this.setText('menu')
    this.setStyles()
    this.close()
    this.on('click', () => this.close())
  }

  setStyles() {
    this.setStyle('background-color', COLORS.RED_2)
    this.setStyle('height', `${SCREEN.getHeight()}px`)
    this.setStyle('width', `${SCREEN.getWidth()}px`)
    this.setStyle('position', 'fixed')
    this.setStyle('z-index', '1')
    this.setStyle('top', '0px')
  }

  open() {
    this.setStyle('margin-left', '0px')
  }

  close() {
    this.setStyle('margin-left', `${SCREEN.getWidth() * -1}px`)
  }
}
