import { HTML, nFlex, nImage } from '@brtmvdl/frontend'
import { getLinksList } from '../lists/links.js'
import { LinkComponent } from './link.component.js'

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

  getLeft() {
    return new LinkComponent('brtmvdl', '/?' + Date.now())
  }

  createImageLink(src, href = '') {
    const link = new LinkComponent(null, href)
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
    Array.from(getLinksList()).map(([a, b]) => html.append(new LinkComponent(a, b)))
    return html
  }
}
