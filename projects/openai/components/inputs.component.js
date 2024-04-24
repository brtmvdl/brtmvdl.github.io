import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'

export class InputsComponent extends HTML {
  children = {
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component) {
    return this.children[component].getValue()
  }
}

export class QueryInputsComponent extends InputsComponent {
  children = {
    interval: new InputTextGroupComponent('interval'),
  }
}

export class BodyInputsComponent extends InputsComponent {
  children = {
    interval: new InputTextGroupComponent('interval'),
    model: new InputTextGroupComponent('model'),
    input: new InputTextGroupComponent('input'),
    voice: new InputTextGroupComponent('voice'),
    speed: new InputTextGroupComponent('speed'),
  }
}
