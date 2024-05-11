import { HTML, nLink, nImage } from '@brtmvdl/frontend'

export class LogoComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getLogoLink())
  }

  setStyles() {
    this.setStyle('max-height', '3rem')
  }

  getLogoLink() {
    const link = new nLink()
    link.href('/')
    link.append(this.getImage())
    return link
  }

  getImage() {
    const image = new nImage()
    image.src('./logo.png')
    image.setAttr('logo')
    image.setStyle('width', '100%')
    image.setStyle('max-height', '4rem')
    return image
  }
}
