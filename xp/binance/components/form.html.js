import { HTML, nSelect, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { getMethodsList, getParamsList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

export class FormHTML extends HTML {
  children = {
    method: new SelectComponent(),
    params: new HTML(),
    send: new ButtonComponent(),
    backup: new InputTextGroupComponent('backup url server'),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
    this.append(this.getBackupInputTextGroup())
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
    this.dispatchEvent('submit', { method: this.getMethodValue(), params: this.getParamsValues(), })
  }

  getMethodValue() {
    return this.children.method.getValue()
  }

  getParamsValues() {
    return getParamsList()[this.getMethodValue()]?.reduce((params, input) => ({ ...params, [input]: this.children.inputs.getValue(input) }), {})
  }

  getBackupInputTextGroup() {
    this.children.backup.children.label.setText('websocket server url')
    this.children.backup.children.input.setPlaceholder('websocket server url')
    return this.children.backup
  }
}
