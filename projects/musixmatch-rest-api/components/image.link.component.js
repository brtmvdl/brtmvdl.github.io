import { HTML, nLink, nImage } from '../../../assets/js/libs/frontend/index.js'

export class ImageLinkComponent extends HTML {
  state = {
    src: '',
    href: '',
    alt: '',
  }

  constructor(src, href = '?', alt = 'image') {
    super()
    this.state.src = src
    this.state.href = href
    this.state.alt = alt
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLink())
  }

  getLink() {
    const link = new nLink()
    link.href(this.state.href)
    link.append(this.getImage())
    return link
  }

  getImage() {
    const image = new nImage()
    image.src(this.state.src)
    image.alt(this.state.alt)
    return image
  }
}
