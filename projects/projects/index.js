import { HTML } from '@brtmvdl/frontend'
import { Head } from './components/head.js'
import { Body } from './components/body.js'

export class Page extends HTML {
  children = {
    header: new Head(),
    body: new Body(),
  }

  onCreate() {
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    this.children.header.on('createproject', () => this.children.body.dispatchEvent('createproject'))

    return this.children.header
  }

  getBody() {
    return this.children.body
  }
}
