import { InputComponent } from '../../../assets/js/components/input.component.js'
import { DateTimeGroupComponent } from '../../../assets/js/components/datetime.group.component.js'
import * as Components from '../../../assets/js/components/inputs.component.js'

export class InputsComponent extends Components.InputsComponent {
  children = {
    symbol: this.getSymbolInputTextGroupComponent(),
    limit: new InputComponent('limit', 1, 'number'),
    fromId: new InputComponent('fromId'),
    interval: new InputComponent('interval'),
    startTime: new DateTimeGroupComponent('startTime', Date.now() - (1000 * 60 * 60 * 24)),
    windowSize: new InputComponent('windowSize'),
    side: new InputComponent('side', 'BUY'),
    type: new InputComponent('type', 'LIMIT'),
    timeInForce: new InputComponent('timeInForce', 'GTC'),
    price: new InputComponent('price', '', 'number'),
    quantity: new InputComponent('quantity', 1, 'number'),
    orderId: new InputComponent('orderId'),
    origClientOrderId: new InputComponent('origClientOrderId'),
    cancelReplaceMode: new InputComponent('cancelReplaceMode'),
    cancelOrigClientOrderId: new InputComponent('cancelOrigClientOrderId'),
    stopPrice: new InputComponent('stopPrice', '', 'number'),
    stopLimitPrice: new InputComponent('stopLimitPrice', '', 'number'),
    stopLimitTimeInForce: new InputComponent('stopLimitTimeInForce'),
    newOrderRespType: new InputComponent('newOrderRespType', 'ACK'),
    orderListId: new InputComponent('orderListId'),
    endTime: new DateTimeGroupComponent('endTime', Date.now()),
    recvWindow: new InputComponent('recvWindow', 100, 'number'),
    apiKey: new InputComponent('apiKey', '', 'password'),
    secretKey: new InputComponent('secretKey', '', 'password'),
    step: new InputComponent('step', 0.1, 'number'),
  }

  getSymbolInputTextGroupComponent() {
    const component = new InputComponent('symbol')
    component.children.input.on('keyup', () => component.children.input.setValue(component.children.input.getValue().toUpperCase()))
    return component
  }
}
