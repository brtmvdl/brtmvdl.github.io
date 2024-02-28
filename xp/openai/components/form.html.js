import { HTML } from '@brtmvdl/frontend'
import { getRequestByName, getPathList } from '../utils/lists.js'
import { BodyInputsComponent, QueryInputsComponent } from './inputs.component.js'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { TextHTML } from './text.html.js'

export class FormHTML extends HTML {
  children = {
    request: new SelectComponent(),
    query: new HTML(),
    body: new HTML(),
    query_inputs: new QueryInputsComponent(),
    body_inputs: new BodyInputsComponent(),
    apiKey: new InputTextGroupComponent('apiKey'),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getQueryParamsHTML())
    this.append(this.getBodyParamsHTML())
    this.append(this.getSendButton())
    this.append(this.children.apiKey)
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEndpointSelect() {
    getPathList().map((endpoint) => this.children.request.addOption(endpoint, endpoint))
    this.children.request.on('change', () => this.onPathSelectChange())
    return this.children.request
  }

  onPathSelectChange(name = this.getRequestValue()) {
    this.children.query.clear()
    this.children.body.clear()
    const request = getRequestByName(name)
    request.body_params.map((component) => this.children.body.append(this.children.body_inputs.getComponent(component)))
    request.query_params.map((component) => this.children.query.append(this.children.query_inputs.getComponent(component)))
  }

  getQueryParamsHTML() {
    const params = new HTML()
    params.append(new TextHTML('Query params'))
    this.children.query.append(new TextHTML('no params'))
    params.append(this.children.query)
    return params
  }

  getBodyParamsHTML() {
    const params = new HTML()
    params.append(new TextHTML('Body params'))
    this.children.body.append(new TextHTML('no params'))
    params.append(this.children.body)
    return params
  }

  getSendButton() {
    const button = new ButtonComponent()
    button.setText('send')
    button.on('click', () => this.onSendButtonClick())
    return button
  }

  onSendButtonClick() {
    const request = getRequestByName(this.getRequestValue())
    this.dispatchEvent('submit', {
      method: request.method,
      path: request.path,
      query: request.query_params.map((input) => ([input, this.children.query_inputs.getValue(input)])),
      body: request.body_params.map((input) => ([input, this.children.body_inputs.getValue(input)])),
    })
  }

  getRequestValue() {
    return this.children.request.getValue()
  }

}
