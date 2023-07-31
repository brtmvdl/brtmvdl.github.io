import { nElement } from '../../js/nelement/index.js'
import { Head } from './components/head.js'
import { Body } from './components/body.js'
import { Foot } from './components/foot.js'

export class Page extends nElement {
  children = {
    header: new Head(),
    body: new Body(),
    footer: new Foot(),
  }

  onCreate() {
    this.append(this.getHeader())
    this.append(this.getBody())
    this.append(this.getFooter())
  }

  getHeader() {
    this.children.header.on('createproject', () => this.children.body.dispatchEvent('create'))
    this.children.header.on('updateproject', () => this.children.footer.dispatchEvent('update'))

    return this.children.header
  }

  getBody() {
    return this.children.body
  }

  getFooter() {
    return this.children.footer
  }
}
