import { HTML } from '@brtmvdl/frontend'
import { getEndpointsList } from '../utils/lists.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { QueryParamsComponent } from './query.params.component.js'
import { HeadersParamsComponent } from './headers.params.component.js'
import { BodyParamsComponent } from './body.params.component.js'

export class FormHTML extends HTML {
  children = {
    endpoint: new SelectComponent('endpoint'),
    query: new HTML(),
    headers: new HTML(),
    body: new HTML(),
    query_params: new QueryParamsComponent(),
    headers_params: new HeadersParamsComponent(),
    body_params: new BodyParamsComponent(),
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

  appendQueryParams(params = []) {
    this.children.query.clear()
    if (Array.from(params).length > 0) {
      Array.from(params).map((component) => this.children.query.append(this.children.query_params.getComponent(component)))
    } else {
      this.children.query.append(new TextComponent('no inputs'))
    }
  }

  appendHeadersParams(params = []) {
    this.children.headers.clear()
    if (Array.from(params).length > 0) {
      Array.from(params).map((component) => this.children.headers.append(this.children.headers_params.getComponent(component)))
    } else {
      this.children.headers.append(new TextComponent('no inputs'))
    }
  }

  appendBodyParams(params = []) {
    this.children.body.clear()
    if (Array.from(params).length > 0) {
      Array.from(params).map((component) => this.children.body.append(this.children.body_params.getComponent(component)))
    } else {
      this.children.body.append(new TextComponent('no inputs'))
    }
  }

  getQueryParams() {
    const html = new HTML()
    html.append(new TextComponent('Query'))
    html.append(this.children.query)
    return html
  }

  getHeadersParams() {
    const html = new HTML()
    html.append(new TextComponent('Headers'))
    html.append(this.children.headers)
    return html
  }

  getBodyParams() {
    const html = new HTML()
    html.append(new TextComponent('Body'))
    html.append(this.children.body)
    return html
  }

  getSendButton() {
    return new ButtonComponent('send', () => this.onSendButtonClick())
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
    return Array.from(query).reduce((q, param) => ({ ...q, [param]: this.children.query_params.getValue(param) }), {})
  }

  getHeadersValues(headers = []) {
    return {}
  }

  getBodyValues(body = []) {
    return null
  }
}
