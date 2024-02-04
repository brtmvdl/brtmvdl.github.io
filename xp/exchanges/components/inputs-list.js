import { HTML } from '@brtmvdl/frontend'

import { InputTextGroupComponent } from './input-text-group.js'

export class InputsList extends HTML {
  getInput(input) {
    return new InputTextGroupComponent(input)
  }
}
