import { HTML } from '@brtmvdl/frontend'
import { getRequestList } from '../utils/lists.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { InputsComponent } from './inputs.component.js'

import * as Local from '../../../assets/js/utils/local.js'

export class FormHTML extends HTML {
  children = {
    request: new SelectComponent(),
    params: new HTML(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getRequestSelect())
    this.append(this.getParamsHTML())
    this.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
    this.append(this.children.inputs.children.apiKey)
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getRequestSelect() {
    getRequestList().map(({ name: endpoint }) => this.children.request.addOption(endpoint, endpoint))
    this.children.request.on('change', () => this.onRequestSelectChange())
    return this.children.request
  }

  onRequestSelectChange() {
    const name = this.children.request.getValue()
    this.children.params.clear()
    this.getRequestByName(name)?.query.map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
  }

  getParamsHTML() {
    return this.children.params
  }

  onSendButtonClick(name = this.getRequestValue()) {
    const request = this.getRequestByName(name)
    const query = this.getQueryValues(name)
    const body = this.getBodyValues(name)
    const headers = this.getHeadersValues(name)
    this.dispatchEvent('submit', { request, query, body, headers })
  }

  getRequestValue() {
    return this.children.request.getValue()
  }

  getAccessToken() {
    return Local.get(['access_token'])
  }

  getQueryValues(name = '') {
    return { access_token: this.getAccessToken(), ...this.getValues(this.getRequestByName(name)?.query) }
  }

  getBodyValues(name) {
    const request = this.getRequestByName(name)
    if (['HEAD', 'GET'].indexOf(request.method) != -1) return null
    return this.getValues(request?.body)
  }

  getHeadersValues(name) {
    const access_token = this.getAccessToken()
    const request = this.getRequestByName(name)
    if (['HEAD', 'GET'].indexOf(request.method) != -1) return {}
    return { Authorization: `Bearer ${access_token}` }
  }

  getValues(list = []) {
    return Array.from(list)
      .map((input) => ([input, this.children.inputs.getValue(input)]))
      .reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }

  getRequestByName(name) {
    return getRequestList().find((method) => method.name == name)
  }
}
