import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { PropertiesInputComponent } from './properties.input.component.js'

export class InputsComponent extends HTML {

  children = {
    text: new InputTextGroupComponent('text'),
    token: new InputTextGroupComponent('token'),
    properties: new PropertiesInputComponent(),
    intents: new InputTextGroupComponent('intents'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component) {
    return this.children[component].getValue()
  }
}
