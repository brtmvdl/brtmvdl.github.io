import { HTML } from '@brtmvdl/frontend'
import { getMethodsList, paramsList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

export class FormHTML extends HTML {
  children = {
    endpoint: new SelectComponent(),
    params: new HTML(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
    this.append(this.children.inputs.children.apiKey)
    this.append(this.children.inputs.children.secretKey)
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEndpointSelect() {
    getMethodsList().map((endpoint) => this.children.endpoint.addOption(endpoint, endpoint))
    this.children.endpoint.on('change', () => this.onMethodSelectChange())
    return this.children.endpoint
  }

  onMethodSelectChange() {
    this.children.params.clear()
    paramsList[this.getEndpointValue()]?.map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
  }

  getParamsHTML() {
    return this.children.params
  }

  getSendButton() {
    return new ButtonComponent('send', () => this.onSendButtonClick())
  }

  onSendButtonClick(Endpoint = this.getEndpointValue()) {
    const Payload = this.getEndpointParams(Endpoint)
    this.dispatchEvent('submit', { Endpoint, Payload })
  }

  getEndpointValue() {
    return this.children.endpoint.getValue()
  }

  getEndpointParams(endpoint = '') {
    const values = paramsList[endpoint].map((input) => ([input, this.children.inputs.getValue(input)]))
    const params = values.sort(([a], [b]) => a.localeCompare(b))
    return params.reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }
}
