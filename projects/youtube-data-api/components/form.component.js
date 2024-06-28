import { HTML } from '@brtmvdl/frontend'
import { getEndpointsList } from '../utils/lists.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class FormHTML extends HTML {
  children = {
    endpoint: new SelectComponent('endpoint'),
    query: new HTML(),
    headers: new HTML(),
    body: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getQueryParams())
    this.append(this.getHeadersParams())
    this.append(this.getBodyParams())
    this.append(this.getSendButton())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEndpointSelect() {
    getEndpointsList().map(({ name: endpoint }) => this.children.endpoint.addOption(endpoint, endpoint))
    this.children.endpoint.on('change', () => this.onMethodSelectChange())
    return this.children.endpoint
  }

  onMethodSelectChange() {
    const endpoint = this.getEndpointValue()
    const request = this.getEndpointsRequest(endpoint)
    this.appendQueryParams(request.query)
    this.appendHeadersParams(request.headers)
    this.appendBodyParams(request.body)
  }

  getEndpointsRequest(endpoint) {
    return getEndpointsList().find((e) => e.name === endpoint)
  }

  getQueryParams() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'Query' }))
    html.append(this.children.query)
    return html
  }

  getHeadersParams() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'Headers' }))
    html.append(this.children.headers)
    return html
  }

  getBodyParams() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'Body' }))
    html.append(this.children.body)
    return html
  }

  getSendButton() {
    return new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
  }

  onSendButtonClick(endpoint = this.getEndpointValue()) {
    const { method, url, query, headers, body } = this.getEndpointsRequest(endpoint)
    this.dispatchEvent('submit', {
      endpoint,
      method,
      url,
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
