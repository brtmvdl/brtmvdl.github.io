import { HTML } from '@brtmvdl/frontend'
import { InputComponent } from '../../../assets/js/components/input.component.js'
import * as config from '../config.js'

export class InputsComponent extends HTML {
  children = {
    token: new InputComponent('token', config.token, 'password'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(name) {
    return this.children[name]?.getValue() || config[name]
  }
}
