import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { getParamsList } from '../utils/lists.js'

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
    apiKey: new InputTextGroupComponent('apiKey', 'apiKey'),
    signature: new InputTextGroupComponent('signature', 'signature'),
    timestamp: new TimestampInputTextGroupComponent('timestamp')
  }

  onCreate() {
    super.onCreate()
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component, method, timestamp) {
    if (component == 'signature') return this.generateKey(method)
    if (component == 'timestamp') return timestamp
    else return Promise.resolve(this.children[component].getValue())
  }

  async generateKey(method) {
    const params_list = await Promise.all(Array.from(['apiKey', 'timestamp', ...getParamsList()[method]]).map(async (param) => [param, await this.getValue(param)]))
    const message = params_list.map(([param, value]) => `${param}=${value}`).join('&')
    console.log({ message })
    const enc = new TextEncoder()
    return window.crypto.subtle.generateKey({ name: 'HMAC', hash: { name: 'SHA-256' }, }, true, ['sign']) // [, 'verify']
      .then((key) => window.crypto.subtle.sign('HMAC', key, enc.encode(message)))
      .then((data) => String.fromCharCode.apply(null, new Uint16Array(data)))
  }

}
