import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'

export class InputsComponent extends HTML {
  children = {
    part: new InputTextGroupComponent('part', 'id'),
    chart: new InputTextGroupComponent('chart', 'mostPopular'),
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
