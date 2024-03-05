import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { DateTimeGroupComponent } from './datetime.group.component.js'

export class InputsComponent extends HTML {
  children = {
    symbol: this.getSymbolInputTextGroupComponent(),
    limit: new InputTextGroupComponent('limit', 1, 'number'),
    fromId: new InputTextGroupComponent('fromId'),
    interval: new InputTextGroupComponent('interval'),
    startTime: new DateTimeGroupComponent('startTime', Date.now() - (1000 * 60 * 60 * 24)),
    windowSize: new InputTextGroupComponent('windowSize'),
    side: new InputTextGroupComponent('side', 'BUY'),
    type: new InputTextGroupComponent('type', 'LIMIT'),
    timeInForce: new InputTextGroupComponent('timeInForce', 'GTC'),
    price: new InputTextGroupComponent('price', '', 'number'),
    quantity: new InputTextGroupComponent('quantity', 1, 'number'),
    orderId: new InputTextGroupComponent('orderId'),
    origClientOrderId: new InputTextGroupComponent('origClientOrderId'),
    cancelReplaceMode: new InputTextGroupComponent('cancelReplaceMode'),
    cancelOrigClientOrderId: new InputTextGroupComponent('cancelOrigClientOrderId'),
    stopPrice: new InputTextGroupComponent('stopPrice', '', 'number'),
    stopLimitPrice: new InputTextGroupComponent('stopLimitPrice', '', 'number'),
    stopLimitTimeInForce: new InputTextGroupComponent('stopLimitTimeInForce'),
    newOrderRespType: new InputTextGroupComponent('newOrderRespType', 'ACK'),
    orderListId: new InputTextGroupComponent('orderListId'),
    endTime: new DateTimeGroupComponent('endTime', Date.now()),
    recvWindow: new InputTextGroupComponent('recvWindow', 100, 'number'),
    apiKey: new InputTextGroupComponent('apiKey', '', 'password'),
    secretKey: new InputTextGroupComponent('secretKey', '', 'password'),
    step: new InputTextGroupComponent('step', 0.1, 'number'),
  }

  getSymbolInputTextGroupComponent() {
    const component = new InputTextGroupComponent('symbol')
    component.children.input.on('keyup', () => component.children.input.setValue(component.children.input.getValue().toUpperCase()))
    return component
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component) {
    return this.children[component].getValue()
  }
}
