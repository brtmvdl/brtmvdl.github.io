import { HTML, nFlex, nImage, nLink } from '@brtmvdl/frontend'
import { getLinksList } from '../lists/links.js'

export class HeaderComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  createLink(text, href = '') {
    const link = new nLink() 
    link.href(href)
    if (text) link.setText(text)
    link.setStyle('display', 'inline-block')
    link.setStyle('margin', '1rem 0rem')
    link.setStyle('padding', '1rem')
    return link
  }

  getLeft() {
    return this.createLink('brtmvdl', '/?' + Date.now())
  }

  createImageLink(src, href = '') {
    const link = this.createLink(null, href)
    link.append(this.createImage(src))
    return link
  }

  createImage(src) {
    const image = new nImage()
    image.src(src)
    return image
  }

  getRight() {
    const html = new nFlex()
    Array.from(getLinksList()).map(([a, b]) => html.append(this.createLink(a, b)))
    return html
  }

}
