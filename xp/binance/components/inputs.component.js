import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'

export class InputsComponent extends HTML {
  children = {
    symbol: new InputTextGroupComponent('symbol'),
    limit: new InputTextGroupComponent('limit'),
    fromId: new InputTextGroupComponent('fromId'),
    interval: new InputTextGroupComponent('interval'),
    startTime: new InputTextGroupComponent('startTime'),
    windowSize: new InputTextGroupComponent('windowSize'),
    apiKey: new InputTextGroupComponent('apiKey'),
    signature: new InputTextGroupComponent('signature'),
    timestamp: new InputTextGroupComponent('timestamp'),
    side: new InputTextGroupComponent('side'),
    type: new InputTextGroupComponent('type'),
    timeInForce: new InputTextGroupComponent('timeInForce'),
    price: new InputTextGroupComponent('price'),
    quantity: new InputTextGroupComponent('quantity'),
    orderId: new InputTextGroupComponent('orderId'),
    origClientOrderId: new InputTextGroupComponent('origClientOrderId'),
    cancelReplaceMode: new InputTextGroupComponent('cancelReplaceMode'),
    cancelOrigClientOrderId: new InputTextGroupComponent('cancelOrigClientOrderId'),
    stopPrice: new InputTextGroupComponent('stopPrice'),
    stopLimitPrice: new InputTextGroupComponent('stopLimitPrice'),
    stopLimitTimeInForce: new InputTextGroupComponent('stopLimitTimeInForce'),
    newOrderRespType: new InputTextGroupComponent('newOrderRespType'),
    orderListId: new InputTextGroupComponent('orderListId'),
    endTime: new InputTextGroupComponent('endTime'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component = '') {
    return this.children[component].getValue()
  }
}
