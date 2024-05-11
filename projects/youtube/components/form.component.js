import { HTML } from '@brtmvdl/frontend'

export class FormComponent extends HTML {
  getName() {
    return 'form'
  }

  getTagName() {
    return 'form'
  }

  submit() {
    this.element.submit()
    return this
  }

}
