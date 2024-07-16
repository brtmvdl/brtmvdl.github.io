import { HTML } from '../../assets/js/libs/frontend/index.js'
import { HeaderHTML } from './components/header.html.js'
import { BodyHTML } from './components/body.html.js'
import { FooterHTML } from './components/footer.html.js'

export class Page extends HTML {
  children = {
    header: new HeaderHTML(),
    body: new BodyHTML(),
    footer: new FooterHTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getHeader())
    this.append(this.getBody())
    this.append(this.getFooter())
  }

  setStyles() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }

  getHeader() {
    this.children.header.addEventListener('createproject', () => this.children.body.dispatch('createproject'))
    return this.children.header
  }

  getBody() {
    this.children.body.addEventListener('update', () => this.children.footer.dispatch('update'))
    return this.children.body
  }

  getFooter() {
    return this.children.footer
  }
}
