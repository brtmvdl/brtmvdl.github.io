import { HTML } from '@brtmvdl/frontend'

import { InputTextGroupComponent } from './input-text-group.component.js'
import { DateTimeGroupComponent } from './datetime.group.component.js'

export class TimestampInputTextGroupComponent extends InputTextGroupComponent {
  onCreate() {
    super.onCreate()
    setInterval(() => this.children.input.setValue(Date.now()), 100)
  }
}

export class InputsComponent extends HTML {
  children = {
    symbol: this.getSymbolInputTextGroupComponent(),
    limit: new InputTextGroupComponent('limit', 1, 'number'),
    fromId: new InputTextGroupComponent('fromId', 0, 'number'),
    interval: new InputTextGroupComponent('interval'),
    startTime: new DateTimeGroupComponent('startTime', Date.now() - (1000 * 60 * 60 * 24)),
    windowSize: new InputTextGroupComponent('windowSize'),
    side: new InputTextGroupComponent('side', 'BUY'),
    type: new InputTextGroupComponent('type', 'LIMIT'),
    timeInForce: new InputTextGroupComponent('timeInForce', 'GTC'),
    price: new InputTextGroupComponent('price', '', 'number'),
    quantity: new InputTextGroupComponent('quantity', 1, 'number'),
    orderId: new InputTextGroupComponent('orderId', '', 'number'),
    origClientOrderId: new InputTextGroupComponent('origClientOrderId', '', 'number'),
    cancelReplaceMode: new InputTextGroupComponent('cancelReplaceMode'),
    cancelOrigClientOrderId: new InputTextGroupComponent('cancelOrigClientOrderId', '', 'number'),
    stopPrice: new InputTextGroupComponent('stopPrice', '', 'number'),
    stopLimitPrice: new InputTextGroupComponent('stopLimitPrice', '', 'number'),
    stopLimitTimeInForce: new InputTextGroupComponent('stopLimitTimeInForce'),
    newOrderRespType: new InputTextGroupComponent('newOrderRespType', 'ACK'),
    orderListId: new InputTextGroupComponent('orderListId', '', 'number'),
    endTime: new DateTimeGroupComponent('endTime', Date.now()),
    recvWindow: new InputTextGroupComponent('recvWindow', 100, 'number'),
    apiKey: new InputTextGroupComponent('apiKey', '', 'password'),
    secretKey: new InputTextGroupComponent('secretKey', '', 'password'),
    // signature: new InputTextGroupComponent('signature', 'signature'),
    // timestamp: new TimestampInputTextGroupComponent('timestamp'),
    // listenKey: new InputTextGroupComponent('listenKey', '', 'password'),
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
