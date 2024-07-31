import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class CanvasComponent extends HTML {
  getName() { return 'canvas-component' }

  getTagName() { return 'canvas' }

  getContext() { return this.element.getContext('2d') }
}
