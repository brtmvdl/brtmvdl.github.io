import { HTML, nSelect, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { getMethodsList } from '../utils/lists.js'

export class FormHTML extends HTML {
  children = {
    method: new SelectComponent(),
    params: new HTML(),
    send: new ButtonComponent(),
    backup: new InputTextGroupComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
    this.append(this.getBackupInputTextGroup())
  }

  getEndpointSelect() {
    getMethodsList().map((endpoint) => this.children.method.addOption(endpoint, endpoint))
    this.children.method.on('change', () => this.onMethodSelectChange())
    return this.children.method
  }

  onMethodSelectChange() {
    console.log('onEndpointSelectChange', this.getMethodValue())
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
    this.dispatchEvent('submit', {
      method: this.getMethodValue(),
      params: this.getParamsValues(),
    })
  }

  getMethodValue() {
    return this.children.method.getValue()
  }

  getParamsValues() {
    return {} // FIXME
  }

  getBackupInputTextGroup() {
    this.children.backup.children.label.setText('backup url server')
    this.children.backup.children.input.setPlaceholder('backup url server')
    return this.children.backup
  }
}
