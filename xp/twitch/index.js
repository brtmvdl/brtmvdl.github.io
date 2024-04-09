import { HTML, nLink, nH1 } from '@brtmvdl/frontend'

export class Page extends HTML {

  onCreate() {
    this.append(this.getTitle())
  }

  getTitle() {
    const link = new nLink()
    link.href('https://dev.twitch.tv/docs/api/get-started/')
    const h1 = new nH1()
    h1.setText('Twitch API')
    link.append(h1)
    return link
  }
}
