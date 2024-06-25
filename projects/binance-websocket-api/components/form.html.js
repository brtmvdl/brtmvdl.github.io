import { HTML } from '@brtmvdl/frontend'
import { getWebSocketMessageModelList } from '../utils/lists.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { InputsComponent } from './inputs.component.js'

export class FormHTML extends HTML {
  children = {
    method: new SelectComponent(),
    params: new HTML(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(new ButtonComponent('send', () => this.onSendButtonClick()))
    this.append(this.children.inputs.children.apiKey)
    this.append(this.children.inputs.children.secretKey)
  }

  onSendButtonClick(method = this.getMethodValue()) {
    this.dispatchEvent('submit', { method, input: this.getParamsValues(method) })
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEndpointSelect() {
    getWebSocketMessageModelList().map(({ name: endpoint }) => this.children.method.addOption(endpoint, endpoint))
    this.children.method.on('change', () => this.onMethodSelectChange())
    return this.children.method
  }

  onMethodSelectChange() {
    this.children.params.clear()
    this.getParamsList(this.getMethodValue()).map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
  }

  getParamsList(method) {
    return getWebSocketMessageModelList().find(({ name }) => name == method)?.params
  }

  getParamsHTML() {
    return this.children.params
  }

  getMethodValue() {
    return this.children.method.getValue()
  }

  getParamsValues(method = '') {
    const values = this.getParamsList(method).map((input) => ([input, this.children.inputs.getValue(input)]))

    let params = Array.from([])

    if (false) {
      values.push(['apiKey', this.children.inputs.getValue('apiKey')])
      values.push(['timestamp', Date.now()])
      params = values.sort(([a], [b]) => a.localeCompare(b))
      params.push(['signature', this.getSignatureValue(this.children.inputs.getValue('secretKey'), params)])
    } else {
      // params = values.sort(([a], [b]) => a.localeCompare(b))
    }

    return params.reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }

  getSignatureValue(key, params) {
    return sha256.hmac(key, params.map(([name, value]) => `${name}=${value}`).join('&')) // https://www.binance.com/en/support/faq/how-to-generate-an-ed25519-key-pair-to-send-api-requests-on-binance-6b9a63f1e3384cf48a2eedb82767a69a
  }
}
