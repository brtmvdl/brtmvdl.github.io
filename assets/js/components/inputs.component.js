import { HTML } from '@brtmvdl/frontend'

export class InputsComponent extends HTML {
  children = {}

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component = '') {
    return this.getComponent(component)?.getValue()
  }
}
