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
    Array.from([
      this.createLink('blog', '/blog/'),
      this.createLink('projects', '/projects/'),
      this.createLink('products', '/products/'),
    ]).map((link) => {
      link.setStyle('margin', '1rem 1rem 1rem 0rem')
      link.setStyle('padding', '1rem 0rem 0rem 0rem')
      flex.append(link)
    })
    return flex
  }
}
