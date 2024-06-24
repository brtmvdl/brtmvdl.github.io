import { HTML } from '@brtmvdl/frontend'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class InputsComponent extends HTML {
  children = {
    part: new InputComponent('part', 'id'),
    chart: new InputComponent('chart', 'mostPopular'),
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
