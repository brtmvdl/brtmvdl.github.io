import { InputComponent } from '../../../assets/js/components/input.component.js'
import * as Components from '../../../assets/js/components/inputs.component.js'
import * as config from '../config.js'

export class InputsComponent extends Components.InputsComponent {
  children = {
    token: new InputComponent('token', config.token, 'password'),
  }
}
