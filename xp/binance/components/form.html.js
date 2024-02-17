import { HTML, nSelect, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { getInBrowserMethodsList, getMethodsList, getParamsList, getUserDataStreamMethodsList, getWebSocketMethodsList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'
import * as config from '../utils/config.js'

export class FormHTML extends HTML {
  children = {
    method: new SelectComponent(),
    params: new HTML(),
    send: new ButtonComponent(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
    this.append(this.children.inputs.children.apiKey)
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getEndpointSelect() {
    getMethodsList().map((endpoint) => this.children.method.addOption(endpoint, endpoint))
    this.children.method.on('change', () => this.onMethodSelectChange())
    return this.children.method
  }

  onMethodSelectChange() {
    this.children.params.clear()
    getParamsList()[this.getMethodValue()]?.map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
  }

  getParamsHTML() {
    return this.children.params
  }

  getSendButton() {
    this.children.send.setText('send')
    this.children.send.on('click', () => this.onSendButtonClick())
    return this.children.send
  }

  onSendButtonClick() {
    const method = this.getMethodValue()
    this.dispatchEvent('submit', { method, params: this.getParamsValues(method) })
  }

  getMethodValue() {
    return this.children.method.getValue()
  }

  getParamsValues(method = '') {
    const values = Array.from(getParamsList()[method])?.map((input) => ([input, this.children.inputs.getValue(input)]))

    let params = Array.from([])

    if (getWebSocketMethodsList().indexOf(method) !== -1) {
      values.push(['apiKey', config.apiKey])
      values.push(['timestamp', Date.now()])
      params = values.sort(([a], [b]) => a.localeCompare(b))
      params.push(['signature', this.getSignatureValue(config.secretKey, params)])
    } else {
      params = values.sort(([a], [b]) => a.localeCompare(b))
    }

    return params.reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }

  getSignatureValue(key, params) {
    return sha256.hmac(key, params.map(([name, value]) => `${name}=${value}`).join('&'))
  }
}
