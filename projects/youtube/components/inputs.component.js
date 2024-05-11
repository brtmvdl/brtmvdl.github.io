import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { DateTimeGroupComponent } from './datetime.group.component.js'

export class InputsComponent extends HTML {
  children = {
    id: new InputTextGroupComponent('id'),
    step: new InputTextGroupComponent('step', 0.1, 'number'),
    apiKey: new InputTextGroupComponent('apiKey', '', 'password'),
  }

  getComponent(component = '') {
    console.log('component', { component })
    return this.children[component]
  }

  getValue(component) {
    console.log('component', { component })
    return this.children[component].getValue()
  }
}
