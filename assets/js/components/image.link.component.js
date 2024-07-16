import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { LinkComponent } from './link.component.js'
import { ImageComponent } from './image.component.js'

export class ImageLinkComponent extends HTML {
  src = ''
  href = ''

  constructor({ src = '', href = '#' } = {}) {
    super()
    this.src = src
    this.href = href
  }

  getName() { return 'image-link-component' }

  onCreate() {
    super.onCreate()
    this.append(this.getLink())
  }

  getLink() {
    const link = new LinkComponent({ href: this.href })
    link.append(this.getImage())
    return link
  }

  getImage() {
    const image = new ImageComponent({ src: this.src, alt: this.href })
    image.setAttr('src', this.src)
    return image
  }
}
