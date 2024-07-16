import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class InputsComponent extends HTML {
  children = {}

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component = '') {
    return this.getComponent(component)?.getValue()
  }
}
