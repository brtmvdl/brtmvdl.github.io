import { HTML, nLink, nH1 } from '@brtmvdl/frontend'

export class HeaderComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getLogoLink())
  }

  getLogoLink() {
    const link = new nLink()
    link.setStyle('color', '#000000')
    link.href('?')
    link.append(this.getTitle())
    return link
  }

  getTitle() {
    const title = new nH1()
    title.setStyle('margin', '1rem')
    title.setText('Workout')
    return title
  }
}
