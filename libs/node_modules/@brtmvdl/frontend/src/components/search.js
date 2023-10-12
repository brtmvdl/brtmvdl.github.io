import { HTML } from '../index.js'
import * as COLORS from '../utils/colors.js'
import SCREEN from './screen.js'

export class SearchComponent extends HTML {
  getName() {
    return 'menu'
  }

  onCreate() {
    this.setText('search')

    this.setStyle('background-color', COLORS.GRAY_2)
    this.setStyle('height', `${SCREEN.getHeight()}px`)
    this.setStyle('width', `${SCREEN.getWidth()}px`)
    this.setStyle('position', 'fixed')
    this.setStyle('z-index', '1')
    this.setStyle('top', '0px')

    this.close()

    this.on('click', () => this.close())
  }

  open() {
    console.log('open search')

    this.setStyle('margin-left', '0px')
  }

  close() {
    console.log('close search')

    this.setStyle('margin-left', `${SCREEN.getWidth() * +1}px`)
  }
}
