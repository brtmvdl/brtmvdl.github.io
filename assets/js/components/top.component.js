import { HTML, nImage, nFlex } from '../../../assets/js/libs/frontend/index.js'
import { LinkComponent } from './link.component.js'
import { ButtonComponent } from './button.component.js'

export class TopComponent extends HTML {
  state = {
    url: '',
  }

  constructor(url = '') {
    super()
    this.state.url = url
  }

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
    const html = new HTML()
    html.append(this.getLogoLink())
    return html
  }

  getLogoLink() {
    const link = new LinkComponent()
    link.href(this.state.url)
    const image = new nImage()
    image.setStyle('max-height', '3rem')
    image.src('./logo.png')
    link.append(image)
    return link
  }

  getRight() {
    const html = new HTML()
    html.append(this.getDownloadButton())
    return html
  }

  getDownloadButton() {
    return new ButtonComponent({ text: 'download', onclick: () => this.dispatch('download') })
  }

}
