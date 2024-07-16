import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class FormComponent extends HTML {
  getName() { return 'form-component' }

  getTagName() { return 'form' }

  hasContainer() { return false }

  setAction(action) {
    this.element.action = action
    return this
  }

  setMethod(method) {
    this.element.method = method
    return this
  }

  submit() {
    this.element.submit()
  }
}
