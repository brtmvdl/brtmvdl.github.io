import { HTML, nLink, nImage } from '@brtmvdl/frontend'

export class LogoComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getImageLink())
    this.setStyle('max-height', '3rem')
  }

  getImageLink() {
    const link = new nLink()
    link.setContainerStyle('max-width', '100%')
    link.href('https://platform.openai.com/docs/api-reference')
    link.setText('OpenAI')
    return link
  }
}
