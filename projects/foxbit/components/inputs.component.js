import { HTML, nFlex } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input.text.group.component.js'

export class InputsComponent extends HTML {
  children = {
    api_key: new InputTextGroupComponent('api_key', '0123456789012345678901234567890123456789', 'password'),
    api_secret: new InputTextGroupComponent('api_secret', '0123456789012345678901234567890123456789', 'password'),
  }
}
