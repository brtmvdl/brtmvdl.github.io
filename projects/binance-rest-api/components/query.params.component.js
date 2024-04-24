import { ParamsComponent } from './params.component.js'
import { InputTextGroupComponent } from './input-text-group.component.js'

export class QueryParamsComponent extends ParamsComponent {
  children = {
    symbol: new InputTextGroupComponent('symbol'),
    interval: new InputTextGroupComponent('interval'),
  }
}
