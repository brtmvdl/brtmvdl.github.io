import { HTML, nFlex } from '@brtmvdl/frontend'
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
    return new LinkComponent({ text: 'brtmvdl', href: '/?' + Date.now() })
  }

  getRight() {
    const html = new nFlex()
    Array.from(getLinksList()).map(([text, href = '']) => new LinkComponent({ text, href }))
    return html
  }
}
