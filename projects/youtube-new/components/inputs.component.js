import { HTML } from '@brtmvdl/frontend'

import { InputTextGroupComponent } from './input-text-group.component.js'

export class InputsComponent extends HTML {
  children = {
    maxResults: new InputTextGroupComponent('maxResults', 50, 'number'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component) {
    return this.children[component].getValue()
  }
}
