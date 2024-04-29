import { HTML, nFlex } from '@brtmvdl/frontend'
import { ContainerComponent } from './container.component.js'
import { LinkComponent } from './link.component.js'

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
    const link = new LinkComponent()
    link.setText(text)
    link.href(href)
    link.setStyle('padding', '1rem 0rem 1rem 0rem')
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
      this.createLink('services', '/services/'),
    ]).map((link) => {
      link.setStyle('padding', '1rem 0rem 1rem 1rem')
      flex.append(link)
    })
    return flex
  }
}
