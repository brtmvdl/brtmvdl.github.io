import { nElement, nH2, nHR, nLink, nImage } from './nElement.js'
import months from '../libs/months.js'

export class Experience {
  title = null
  image = null
  link = null
  type = null
  dates = null

  constructor({
    title = '',
    image = '',
    link = '',
    type = '',
    dates = [],
  } = {}) {
    this.title = title
    this.image = image
    this.link = link
    this.type = type
    this.dates = dates
  }

  getListItem() {
    const { type, link, image, title, dates } = this

    const xpEl = new nElement()
    xpEl.addData('type', type)
    xpEl.setStyle('padding', '1rem 0rem')

    if (link) {
      const linkEl = new nLink()
      linkEl.href(link)

      const imageEl = new nImage()
      imageEl.src(image)
      linkEl.append(imageEl)

      xpEl.append(linkEl)
    } else {
      const imageEl = new nImage()
      imageEl.src(image)
      xpEl.append(imageEl)
    }

    const titleEl = new nH2()
    titleEl.setText(title)
    xpEl.append(titleEl)

    if (dates && dates.length) {
      const dateEl = new nElement()
      dateEl.setText(dates.map(([y, m]) => [y, months(m)].join(' / ')).join(' - '))
      xpEl.append(dateEl)
    }

    xpEl.append(new nHR())

    return xpEl
  }
}
