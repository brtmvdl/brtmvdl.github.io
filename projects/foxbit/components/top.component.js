import { HTML, nImage, nFlex } from '@brtmvdl/frontend'
import { ButtonComponent } from './button.component.js'
import { LinkComponent } from './link.component.js'
import * as config from '../config.js'

export class TopComponent extends HTML {
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
    link.href(config.URL)
    const image = new nImage()
    image.setStyle('max-height', '3rem')
    image.src('./foxbit.svg')
    link.append(image)
    return link
  }

  getRight() {
    const html = new HTML()
    html.append(this.getDownloadButton())
    return html
  }

  getDownloadButton() {
    const button = new ButtonComponent()
    button.setText('download')
    button.on('click', () => this.dispatchEvent('download'))
    return button
  }
}
