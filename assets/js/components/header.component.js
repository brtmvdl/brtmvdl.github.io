import { HTML, nFlex, nLink } from '@brtmvdl/frontend'
import { ContainerComponent } from './container.component.js'

export class HeaderComponent extends ContainerComponent {
  getName() {
    return 'header-component'
  }

  onCreate() {
    super.onCreate()
    this.append(this.getContainer())
  }

  getContainer() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  createLink(text, href = '') {
    const link = new nLink()
    link.setText(text)
    link.href(href)
    return link
  }

  getLeft() {
    return this.createLink('index', '/?' + Date.now())
  }

  getRight() {
    const flex = new nFlex()
    flex.append(this.createLink('blog', '/blog/'))
    flex.append(this.createLink('projects', '/projects/'))
    flex.append(this.createLink('products', '/products/'))
    return flex
  }
}
