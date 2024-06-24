import { HTML, nFlex } from '@brtmvdl/frontend'
import { RequestModel } from '../../../assets/js/models/request.model.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { InputsComponent } from '../../../assets/js/components/inputs.component.js'
import { getRequestsList } from '../utils/list.js'

export class FormComponent extends HTML {
  children = {
    requests_select: new SelectComponent(),
    input_list: new HTML(),
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
    return new ButtonComponent('send', () => this.onSendButtonClick())
  }

  onSendButtonClick() {
    const request = getRequestsList().find((req) => req.name == this.getRequestsSelectValue())
    this.callAPI(request)
      .then((response) => this.dispatchEvent('response', { request, response }))
      .catch((error) => this.dispatchEvent('error', { request, error }))
  }

  callAPI(req = new RequestModel()) {
    const url = this.getRequestUrl(req)
    const method = this.getRequestMethod(req)
    const headers = this.getRequestHeaders(req)
    const body = this.getRequestBody(req)
    return fetch(url.toString(), { method, headers, body })
  }

  getRequestUrl(req = new RequestModel()) {
    const url = new URL(req.getUrl())
    const search = new URLSearchParams(this.reduceParams(req.params))
    Object.keys(search).map((key) => url.searchParams.set(key, search.get(key)))
    return url.toString()
  }

  getRequestMethod(req = new RequestModel()) {
    return null
  }

  getRequestHeaders(req = new RequestModel()) {
    return null
  }

  getRequestBody(req = new RequestModel()) {
    return null
  }

  reduceParams(params = []) {
    return Array.from(params).reduce((params, key) => ({ ...params, [key]: this.children.inputs.getValue(key) }), {})
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
