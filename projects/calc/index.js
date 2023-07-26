import { nElement } from '../../js/nelement/index.js'
import { Head } from './head.js'
import { Body } from './body.js'

export class Page extends nElement {
  children = {
    head: new Head(),
    body: new Body(),
  }

  onCreate() {
    this.append(this.getHead())
    this.append(this.getBody())
  }

  getHead() {
    return this.children.head
  }

  getBody() {
    return this.children.body
  }
}
