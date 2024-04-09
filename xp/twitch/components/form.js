import { HTML } from '@brtmvdl/frontend'

export class FormComponent extends HTML {
  getTagName() {
    return 'form'
  }

  getName() {
    return 'form'
  }

  src(src = '') {
    this.element.src = src
  }

  submit() {
    this.element.submit()
  }
}
