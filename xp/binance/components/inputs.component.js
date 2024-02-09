import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import * as config from '../config.js'

export class TimestampInputTextGroupComponent extends InputTextGroupComponent {
  onCreate() {
    super.onCreate()
    setInterval(() => this.children.input.setValue(Date.now()), 100)
  }
}

export class InputsComponent extends HTML {
  children = {
    symbol: new InputTextGroupComponent('symbol'),
    limit: new InputTextGroupComponent('limit', 1),
    fromId: new InputTextGroupComponent('fromId', 0),
    interval: new InputTextGroupComponent('interval'),
    startTime: new InputTextGroupComponent('startTime', Date.now() - (1000 * 60 * 60 * 24)),
    windowSize: new InputTextGroupComponent('windowSize'),
    apiKey: new InputTextGroupComponent('apiKey'),
    signature: new InputTextGroupComponent('signature'),
    timestamp: new TimestampInputTextGroupComponent('timestamp'),
    side: new InputTextGroupComponent('side', 'buy'),
    type: new InputTextGroupComponent('type'),
    timeInForce: new InputTextGroupComponent('timeInForce'),
    price: new InputTextGroupComponent('price'),
    quantity: new InputTextGroupComponent('quantity', 1),
    orderId: new InputTextGroupComponent('orderId'),
    origClientOrderId: new InputTextGroupComponent('origClientOrderId'),
    cancelReplaceMode: new InputTextGroupComponent('cancelReplaceMode'),
    cancelOrigClientOrderId: new InputTextGroupComponent('cancelOrigClientOrderId'),
    stopPrice: new InputTextGroupComponent('stopPrice'),
    stopLimitPrice: new InputTextGroupComponent('stopLimitPrice'),
    stopLimitTimeInForce: new InputTextGroupComponent('stopLimitTimeInForce'),
    newOrderRespType: new InputTextGroupComponent('newOrderRespType'),
    orderListId: new InputTextGroupComponent('orderListId'),
    endTime: new InputTextGroupComponent('endTime', Date.now()),
    recvWindow: new InputTextGroupComponent('recvWindow'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component = '') {
    if (component == 'apiKey') return config.apiKey
    if (component == 'signature') return this.getSignature()
    return this.children[component].getValue()
  }

  getSignature() {
    const [apiKey, newOrderRespType, price, quantity, recvWindow, side, symbol, timeInForce, timestamp, type] =
      Array.from(['apiKey', 'newOrderRespType', 'price', 'quantity', 'recvWindow', 'side', 'symbol', 'timeInForce', 'timestamp', 'type']).map((c) => this.getValue(c))

    const hash = `apiKey=${apiKey}&newOrderRespType=${newOrderRespType}&price=${price}&quantity=${quantity}&recvWindow=${recvWindow}&side=${side}&symbol=${symbol}&timeInForce=${timeInForce}&timestamp=${timestamp}&type=${type}`
    return '' // jssha256.sha256.hmac(apiKey, hash)
  }
}