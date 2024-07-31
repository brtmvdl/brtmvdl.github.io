import { HTML, nFlex } from '../libs/frontend/index.js'
import { LinkComponent } from './link.component.js'

import * as LOCAL from '../../../assets/js/utils/local.js'

export class HeaderComponent extends HTML {
  props = {
    links: Array.from([
      LOCAL.get(['access_token']) ? ['logout', '/pages/logout/'] : ['login', '/pages/login/'],
      ['products', '/products/'],
      ['projects', '/projects/'],
      ['blog', '/blog/'],
      ['donate', '/pages/donate/'],
    ])
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(new LinkComponent({ text: 'brtmvdl', href: '/?' + Date.now() }))
    flex.append(this.getRight())
    return flex
  }

  getRight() {
    const html = new nFlex()
    Array.from(this.props.links)
      .map(([text, href = '']) => new LinkComponent({ text, href }))
      .map((link) => link.setContainerStyle('margin-left', 'calc(1rem / 4)'))
      .map((link) => html.append(link))
    return html
  }
}
