import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import * as config from '../config.js'

export class InputsComponent extends HTML {
  children = {
    token: new InputTextGroupComponent('token', config.token, 'password'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(name) {
    return this.children[name]?.getValue() || config[name]
  }
}
