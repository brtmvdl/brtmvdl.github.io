import { HTML, nH1, nImage, nFlex } from '@brtmvdl/frontend'
import { PageComponent } from './assets/js/components/page.component.js'
import { BodyComponent } from './assets/js/components/body.component.js'
import { LinkComponent } from './assets/js/components/link.component.js'

export class Page extends PageComponent {
  getBodyComponent() {
    const component = new BodyComponent()
    component.setContainerStyle('background-color', '#ffffff')
    component.setContainerStyle('color', '#000000')
    component.append(this.getContentComponent())
    return component
  }

  getContentComponent() {
    const flex = new nFlex()
    flex.append(this.getLeftComponent())
    flex.append(this.getRightComponent())
    return flex
  }

  getLeftComponent() {
    const html = new HTML()
    html.append(this.getPageTitle())
    html.append(this.getPageDescription())
    html.append(this.getPageLinks())
    return html
  }

  getPageTitle() {
    const html = new nH1()
    html.setText('Tarsis de Lima')
    return html
  }

  getPageDescription() {
    const html = new HTML()
    html.setText('')
    return html
  }

  getPageLinks() {
    const flex = new nFlex()
    flex.append(this.createSocialLink('email', 'mailto:br.tmvdl@gmail.com'))
    flex.append(this.createSocialLink('linkedin', 'https://www.linkedin.com/in/brtmvdl/'))
    flex.append(this.createSocialLink('github', 'https://github.com/brtmvdl'))
    flex.append(this.createSocialLink('twitter', 'https://twitter.com/brtmvdl'))
    return flex
  }

  createSocialLink(name, url = '') {
    const link = new LinkComponent()
    link.href(url)
    link.append(this.createImage(name))
    return link
  }

  createImage(name) {
    const image = new nImage()
    image.src(`/assets/img/${name}.svg`)
    image.alt(name)
    return image
  }

  getRightComponent() {
    return this.getPhotoComponent()
  }

  getPhotoComponent() {
    const image = new nImage()
    image.src('/assets/img/me.png')
    image.alt('me')
    return image
  }
}
