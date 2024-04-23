import { HTML } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getButtons())
  }

  getTitle() {
    const html = new HTML()
    html.setTitle('title')
    return html
  }

  getButtons() {
    const html = new HTML()
    html.setTitle('buttons')
    return html
  }
}
