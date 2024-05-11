import { HTML } from '@brtmvdl/frontend'
import { getMethodsList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
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
    this.append(this.getSendButton())
    this.append(this.children.inputs.children.apiKey)
    this.append(this.children.inputs.children.secretKey)
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEndpointSelect() {
    getMethodsList().map(({ name: endpoint }) => this.children.method.addOption(endpoint, endpoint))
    this.children.method.on('change', () => this.onMethodSelectChange())
    return this.children.method
  }

  onMethodSelectChange() {
    const name = this.children.method.getValue()
    this.children.params.clear()
    getMethodsList().find((method) => method.name == name)?.query.map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
  }

  getParamsHTML() {
    return this.children.params
  }

  getSendButton() {
    const button = new ButtonComponent()
    button.setText('send')
    button.on('click', () => this.onSendButtonClick())
    return button
  }

  onSendButtonClick(method = this.getMethodValue()) {
    this.dispatchEvent('submit', { method, input: this.getParamsValues(method) })
  }

  getMethodValue() {
    return this.children.method.getValue()
  }

  getParamsValues(name = '') {
    return getMethodsList().find((method) => method.name == name)?.query
      .map((input) => ([input, this.children.inputs.getValue(input)]))
      .reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }
}
