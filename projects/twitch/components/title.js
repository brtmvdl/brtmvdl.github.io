import { HTML, nLink, nH1 } from '../../../assets/js/libs/frontend/index.js'

export class TitleComponent extends HTML {
  title = ''
  link = ''

  constructor(title, link = '') {
    super()
    this.title = title
    this.link = link
  }

  onCreate() {
    const link = new nLink()
    link.href(this.link)
    const h1 = new nH1()
    h1.setText(this.title)
    link.append(h1)
    this.append(link)
  }
}
