import { HTML } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getButtons())
  }

  getTitle() {
    const html = new HTML()
    html.setText('title')
    return html
  }

  getButtons() {
    const html = new HTML()
    html.setText('buttons')
    return html
  }
}
