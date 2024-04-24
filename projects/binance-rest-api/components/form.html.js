import { HTML } from '@brtmvdl/frontend'
import { getEndpointsList, getEndpointsRequest } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { TitleComponent } from './title.component.js'
import { QueryParamsComponent } from './query.params.component.js'
import { HeadersParamsComponent } from './headers.params.component.js'
import { BodyParamsComponent } from './body.params.component.js'
import { TextHTML } from './text.html.js'

export class FormHTML extends HTML {
  children = {
    endpoint: new SelectComponent(),
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
    getEndpointsList().map((endpoint) => this.children.endpoint.addOption(endpoint, endpoint))
    this.children.endpoint.on('change', () => this.onMethodSelectChange())
    return this.children.endpoint
  }

  onMethodSelectChange() {
    const endpoint = this.getEndpointValue()
    const request = getEndpointsRequest(endpoint)
    this.appendQueryParams(request.query)
    this.appendHeadersParams(request.headers)
    this.appendBodyParams(request.body)
  }

  appendQueryParams(params = []) {
    this.children.query.clear()
    if (Array.from(params).length > 0) {
      Array.from(params).map((component) => this.children.query.append(this.children.query_params.getComponent(component)))
    } else {
      this.children.query.append(new TextHTML('no inputs'))
    }
  }

  appendHeadersParams(params = []) {
    this.children.headers.clear()
    if (Array.from(params).length > 0) {
      Array.from(params).map((component) => this.children.headers.append(this.children.headers_params.getComponent(component)))
    } else {
      this.children.headers.append(new TextHTML('no inputs'))
    }
  }

  appendBodyParams(params = []) {
    this.children.body.clear()
    if (Array.from(params).length > 0) {
      Array.from(params).map((component) => this.children.body.append(this.children.body_params.getComponent(component)))
    } else {
      this.children.body.append(new TextHTML('no inputs'))
    }
  }

  getQueryParams() {
    const html = new HTML()
    html.append(new TitleComponent('Query'))
    html.append(this.children.query)
    return html
  }

  getHeadersParams() {
    const html = new HTML()
    html.append(new TitleComponent('Headers'))
    html.append(this.children.headers)
    return html
  }

  getBodyParams() {
    const html = new HTML()
    html.append(new TitleComponent('Body'))
    html.append(this.children.body)
    return html
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
    return Array.from(query).reduce((q, param) => ({ ...q, [param]: this.children.query_params.getValue(param) }), {})
  }

  getHeadersValues(headers = []) {
    return {}
  }

  getBodyValues(body = []) {
    return null
  }
}
