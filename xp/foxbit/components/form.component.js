import { HTML, nFlex } from '@brtmvdl/frontend'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'
import { getRequestsList } from '../utils/list.js'

export class FormComponent extends HTML {
  children = {
    requests_select: new SelectComponent(),
    input_list: new HTML(),
    send_button: new ButtonComponent(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getRequestsSelect())
    this.append(this.getInputList())
    this.append(this.getSendButton())
    this.append(this.getApiKeyInput())
    this.append(this.getApiSecretInput())
  }

  getRequestsSelect() {
    getRequestsList().map((req) => this.children.requests_select.addOption(req.name, req.name))
    this.children.requests_select.on('change', () => this.onRequestsSelectChange())
    return this.children.requests_select
  }

  onRequestsSelectChange() {
    this.children.input_list.clear()
    console.log('onRequestsSelectChange', this.getRequestsSelectValue())
  }

  getInputList() {
    return this.children.input_list
  }

  getSendButton() {
    this.children.send_button.setText('send')
    this.children.send_button.on('click', () => this.onSendButtonClick())
    return this.children.send_button
  }

  onSendButtonClick() {
    const request = getRequestsList().find((req) => req.name == this.getRequestsSelectValue())
    request.call()
      .then((response) => this.dispatchEvent('response', { request, response }))
      .catch((error) => this.dispatchEvent('error', { request, error }))
  }

  getRequestsSelectValue() {
    return this.children.requests_select.getValue()
  }

  getApiKeyInput() {
    return this.children.inputs.children.api_key
  }

  getApiSecretInput() {
    return this.children.inputs.children.api_secret
  }
}
