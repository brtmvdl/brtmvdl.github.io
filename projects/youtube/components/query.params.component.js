import * as Components from '../../../assets/js/components/inputs.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class QueryParamsComponent extends Components.InputsComponent {
  children = {
    symbol: new InputComponent('symbol'),
    interval: new InputComponent('interval'),
  }
}
