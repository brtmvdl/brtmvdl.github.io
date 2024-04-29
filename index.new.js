import { HTML, nLink, nFlex, nImage } from '@brtmvdl/frontend'
import { HeaderComponent } from './assets/js/components/header.component.js'
import { ContainerComponent } from './assets/js/components/container.component.js'
import { FooterComponent } from './assets/js/components/footer.component.js'
import { TextComponent } from './assets/js/components/text.component.js'

export class Page extends HTML {
  children = {
    body: new ContainerComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent())
    this.append(this.getBody())
    this.append(new FooterComponent())
  }

  getBody() {
    const body = new HTML()
    body.append(this.getJumbotronHTML())
    body.append(this.getBlogHTML())
    body.append(this.getProductsHTML())
    body.append(this.getProjectsHTML())
    return this.children.body.append(body)
  }

  getJumbotronHTML() {
    return new HTML()
  }

  createMenu(title = new nLink(), links = []) {
    const html = new HTML()
    html.append(title)
    const flex = new nFlex()
    Array.from(links).map((link = new nLink()) => flex.append(link))
    html.append(flex)
    return html
  }

  createLink(title, href) {
    const link = new nLink()
    link.setText(title)
    link.href(href)
    return link
  }

  createImage(url, alt = '') {
    const image = new nImage()
    image.src(url)
    image.alt(alt)
    return image
  }

  createMenuItem(title, url = '/') {
    const link = new nLink()
    link.href(url)
    link.append(this.createImage(`${url}image.png`))
    link.append(new TextComponent(title))
    return link
  }

  getBlogHTML() {
    return this.createMenu(this.createLink('Blog', '/blog/'), [
      this.createMenuItem('Post 1', '/blog/1/'),
      this.createMenuItem('Post 2', '/blog/2/'),
    ])
  }

  getProductsHTML() {
    return this.createMenu(this.createLink('Products', '/Products/'), [
      this.createMenuItem('Product 1', '/products/1/'),
      this.createMenuItem('Product 2', '/products/2/'),
      this.createMenuItem('Product 3', '/products/3/'),
      this.createMenuItem('Product 4', '/products/4/'),
    ])
  }

  getProjectsHTML() {
    return this.createMenu(this.createLink('Projects', '/Projects/'), [
      this.createMenuItem('Project 1', '/projects/1/'),
      this.createMenuItem('Project 2', '/projects/2/'),
      this.createMenuItem('Project 3', '/projects/3/'),
      this.createMenuItem('Project 4', '/projects/4/'),
    ])
  }
}
