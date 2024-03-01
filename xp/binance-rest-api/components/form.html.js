import { HTML } from '@brtmvdl/frontend'
import { getEndpointsList, getEndpointsRequest } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'

export class FormHTML extends HTML {
  children = {
    endpoint: new SelectComponent(),
    params: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEndpointSelect() {
    getEndpointsList().map((endpoint) => this.children.endpoint.addOption(endpoint, endpoint))
    this.children.endpoint.on('change', () => this.onMethodSelectChange())
    return this.children.endpoint
  }

  onMethodSelectChange() {
    this.children.params.clear()
    const endpoint = this.getEndpointValue()
    // getParamsList(this.getEndpointValue()).map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
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

  onSendButtonClick(endpoint = this.getEndpointValue()) {
    const { method, pathname, query, headers, body } = getEndpointsRequest(endpoint)
    this.dispatchEvent('submit', {
      endpoint,
      method,
      pathname,
      query: this.getQueryValues(query),
      headers: this.getHeadersValues(headers),
      body: this.getBodyValues(body),
    })
  }

  getEndpointValue() {
    return this.children.endpoint.getValue()
  }

  getQueryValues(query = []) {
    return {}
  }

  getHeadersValues(headers = []) {
    return {}
  }

  getBodyValues(body = []) {
    return null
  }
}
