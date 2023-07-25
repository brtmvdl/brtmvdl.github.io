import { nElement, nH2, nHr, nLink, nImage } from './nelement/index.js'
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

    const linkEl = new nLink()
    linkEl.href(link)
    xpEl.append(linkEl)

    const titleEl = new nH2()
    titleEl.setText(title)
    titleEl.setStyle('margin-bottom', '0.5em')
    linkEl.append(titleEl)

    const imageEl = new nImage()
    imageEl.setStyle('margin-bottom', '0.5em')
    imageEl.src(image)
    linkEl.append(imageEl)

    if (dates && dates.length) {
      const dateEl = new nElement()
      dateEl.setText(dates.map(([y, m]) => [y, months(m)].join(' / ')).join(' - '))
      xpEl.append(dateEl)
    }

    xpEl.append(new nHr())

    return xpEl
  }
}
