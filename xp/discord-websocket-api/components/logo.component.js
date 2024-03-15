import { HTML, nImage, nLink } from '@brtmvdl/frontend'

export class LogoComponent extends HTML {

  onCreate() {
    super.onCreate()
    this.append(this.getLink())
  }

  getLink() {
    const link = new nLink()
    link.href('https://discord.com/developers/docs/topics/gateway')
    link.append(this.getImage())
    return link
  }

  getImage() {
    const image = new nImage()
    image.src('./logo.png')
    image.setStyle('max-height', '3rem')
    return image
  }
}
