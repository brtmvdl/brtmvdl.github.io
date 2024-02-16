import { HTML, nSelect, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { getMethodsList, getParamsList, getWebSocketMethodsList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

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
    const list = Array.from(getParamsList()[method])

    const params = list?.map((input) => ([input, this.children.inputs.getValue(input)]))

    if (getWebSocketMethodsList().indexOf(method) !== -1) {
      params.push(['timestamp', Date.now()])
      const apiKey = this.children.inputs.getValue('apiKey')
      params.push(['apiKey', apiKey])
      const message = params?.sort(([a], [b]) => a.localeCompare(b)).map(([name, value]) => `${name}=${value}`).join('&')
      params.push(['signature', sha256.hmac(apiKey, message)])
    }

    return params?.sort(([a], [b]) => a.localeCompare(b)).reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }
}
