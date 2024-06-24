import * as Components from '../../../assets/js/components/inputs.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class InputsComponent extends Components.InputsComponent {
  children = {
    api_key: new InputComponent('api_key', '0123456789012345678901234567890123456789', 'password'),
    api_secret: new InputComponent('api_secret', '0123456789012345678901234567890123456789', 'password'),
  }
}
