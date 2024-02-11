import { HTML, nSelect, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
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

  async onMethodSelectChange() {
    this.children.params.clear()
    const method = await this.getMethodValue()
    getParamsList()[method]?.map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
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
    Promise.all([this.getMethodValue(), this.getParamsValues(),]).then(([method, params]) => this.dispatchEvent('submit', { method, params, }))
  }

  getMethodValue() {
    return Promise.resolve(this.children.method.getValue())
  }

  async getParamsValues() {
    const timestamp = Date.now()
    const method = await this.getMethodValue()
    const params = Array.from(getParamsList()[method]).concat(getWebSocketMethodsList().indexOf(method) !== -1 ? ['apiKey', 'signature', 'timestamp'] : [])
    const values = await Promise.all(params.map(async (input) => [input, await this.children.inputs.getValue(input, method, timestamp)]))
    return Array.from(values).reduce((params, [input, value]) => ({ ...params, [input]: value }), {})
  }

}
