import { nElement, nImage, nLink } from './nelement/index.js'

export class Social {
  title = ''
  image = ''
  link = ''

  constructor({
    title = '',
    image = '',
    link = '',
  } = {}) {
    this.title = title
    this.image = image
    this.link = link
  }

  getListItem() {
    const el = new nElement()
    el.setStyle('margin', '1em 0em')
    el.setStyle('width', '4em')

    const link = new nLink()
    link.href(this.link)
    el.append(link)

    const image = new nImage()
    image.src(this.image)
    image.alt(this.title)
    link.append(image)

    return el
  }

}
