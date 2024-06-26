import { HTML, nFlex, nImage } from '@brtmvdl/frontend'
import { getLinksList } from '../lists/links.js'
import { LinkComponent } from './link.component.js'
import { ImageComponent } from './image.component.js'

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
    return new LinkComponent({ text: 'brtmvdl', href: '/?' + Date.now() })
  }

  createImageLink(src, href = '') {
    const link = new LinkComponent({ text: null, href })
    link.append(new ImageComponent({ src }))
    return link
  }

  getRight() {
    const html = new nFlex()
    Array.from(getLinksList()).map(([a, b]) => html.append(new LinkComponent({ text: a, href: b })))
    return html
  }
}
