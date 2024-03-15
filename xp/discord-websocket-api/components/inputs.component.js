import { HTML } from '@brtmvdl/frontend'
import * as values from '../config.js'

export class InputsComponent extends HTML {

  children = {}

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(name) {
    return this.children[name]?.getValue() || values[name]
  }
}
