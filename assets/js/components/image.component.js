import { HTML, nImage } from '@brtmvdl/frontend'

export class ImageComponent extends nImage {
  getName() { return 'image-component' }

  state = {
    src: '',
    alt: '',
  }

  constructor({ src, alt = '' }) {
    super()
    this.state.src = src
    this.state.alt = alt
  }

  onCreate() {
    this.setAttr('src', this.state.src)
    if (this.state.alt) this.setAttr('alt', this.state.alt)
  }
}
