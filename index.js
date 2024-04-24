import { HTML } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    header: new HTML(),
    body: new HTML(),
    footer: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getHeader())
    this.append(this.getBody())
    this.append(this.getFooter())
  }

  setStyles() {
    this.setStyle('', '')
  }

  getHeader() {
    this.children.header.setText('header')
    return this.children.header
  }

  getBody() {
    this.children.body.setText('body')
    return this.children.body
  }

  getFooter() {
    return this.children.footer
  }
}
