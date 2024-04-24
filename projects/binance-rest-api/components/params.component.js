import { HTML, nInput } from '@brtmvdl/frontend'

export class ParamsComponent extends HTML {
  children = {}

  getComponent(component) {
    return this.children[component] || new nInput()
  }

  getValue(component) {
    return this.getComponent(component).getValue()
  }
}
