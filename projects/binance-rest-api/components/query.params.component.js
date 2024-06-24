import { ParamsComponent } from './params.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class QueryParamsComponent extends ParamsComponent {
  children = {
    symbol: new InputComponent('symbol'),
    interval: new InputComponent('interval'),
  }
}
