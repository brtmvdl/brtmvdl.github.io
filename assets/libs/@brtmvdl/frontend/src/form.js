import { HTML } from './html.js'

export class nForm extends HTML {
  getName() {
    return 'form'
  }

  getTagName() {
    return 'form'
  }

  setAction (action = '') {
    this.setAttr('action', action)
  }

  setMethod (method = '') {
    this.setAttr('method', method)
  }
}
