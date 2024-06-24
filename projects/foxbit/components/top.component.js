import { HTML, nImage, nFlex } from '@brtmvdl/frontend'
import { LinkComponent } from '../../../assets/js/components/link.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
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
    return new ButtonComponent('download', () => this.dispatchEvent('download'))
  }

}
