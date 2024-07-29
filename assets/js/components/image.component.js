import { HTML, nImage } from '../../../assets/js/libs/frontend/index.js'

export class ImageComponent extends nImage {
  getName() { return 'image-component' }

  state = { src: '', alt: '', }

  constructor({ src, alt = '' }) {
    super()
    this.state.src = src
    this.state.alt = alt
  }

  onCreate() {
    this.setStyle('width', '100%')
    this.setAttr('src', this.state.src)
    if (this.state.alt) this.setAttr('alt', this.state.alt)
  }
}
