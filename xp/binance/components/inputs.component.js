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
    apiKey: new InputTextGroupComponent('apiKey', config.apiKey),
    signature: new InputTextGroupComponent('signature'),
    timestamp: new TimestampInputTextGroupComponent('timestamp'),
    side: new InputTextGroupComponent('side', 'BUY'),
    type: new InputTextGroupComponent('type', 'LIMIT'),
    timeInForce: new InputTextGroupComponent('timeInForce', 'GTC'),
    price: new InputTextGroupComponent('price'),
    quantity: new InputTextGroupComponent('quantity', 1),
    orderId: new InputTextGroupComponent('orderId'),
    origClientOrderId: new InputTextGroupComponent('origClientOrderId'),
    cancelReplaceMode: new InputTextGroupComponent('cancelReplaceMode'),
    cancelOrigClientOrderId: new InputTextGroupComponent('cancelOrigClientOrderId'),
    stopPrice: new InputTextGroupComponent('stopPrice'),
    stopLimitPrice: new InputTextGroupComponent('stopLimitPrice'),
    stopLimitTimeInForce: new InputTextGroupComponent('stopLimitTimeInForce'),
    newOrderRespType: new InputTextGroupComponent('newOrderRespType', 'ACK'),
    orderListId: new InputTextGroupComponent('orderListId'),
    endTime: new InputTextGroupComponent('endTime', Date.now()),
    recvWindow: new InputTextGroupComponent('recvWindow', 100),
  }

  onCreate() {
    super.onCreate()
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component = '') {
    return this.children[component].getValue()
  }

  updateSignature() {
    const [apiKey, newOrderRespType, price, quantity, recvWindow, side, symbol, timeInForce, timestamp, type] =
      Array.from(['apiKey', 'newOrderRespType', 'price', 'quantity', 'recvWindow', 'side', 'symbol', 'timeInForce', 'timestamp', 'type']).map((c) => this.getValue(c))

    const message = `apiKey=${apiKey}&newOrderRespType=${newOrderRespType}&price=${price}&quantity=${quantity}&recvWindow=${recvWindow}&side=${side}&symbol=${symbol}&timeInForce=${timeInForce}&timestamp=${timestamp}&type=${type}`
    const msgUint8 = new TextEncoder().encode(message)
    crypto.subtle.digest('SHA-256', msgUint8)
      .then((hashBuffer) => Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join(''))
      .then((hashHex) => this.children.signature.children.input.setValue(hashHex))
      .then(() => setTimeout(() => this.updateSignature(), 100))
      .catch((err) => console.error(err))
  }
}
