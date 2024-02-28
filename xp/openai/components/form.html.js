import { HTML } from '@brtmvdl/frontend'
import { getQueryParamsList, getBodyParamsList, getPathList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { BodyInputsComponent, QueryInputsComponent } from './inputs.component.js'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { TextHTML } from './text.html.js'

export class FormHTML extends HTML {
  children = {
    path: new SelectComponent(),
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
    getPathList().map((endpoint) => this.children.path.addOption(endpoint, endpoint))
    this.children.path.on('change', () => this.onPathSelectChange())
    return this.children.path
  }

  onPathSelectChange(path = this.getPathValue()) {
    this.children.query.clear()
    this.children.body.clear()
    getQueryParamsList(path).map((component) => this.children.query.append(this.children.query_inputs.getComponent(component)))
    getBodyParamsList(path).map((component) => this.children.body.append(this.children.body_inputs.getComponent(component)))
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

  onSendButtonClick(path = this.getPathValue()) {
    this.dispatchEvent('submit', { path, query: this.getQueryParamsValues(path), body: this.getBodyParamsValues(path) })
  }

  getPathValue() {
    return this.children.path.getValue()
  }

  getQueryParamsValues(path = '') {
    return getQueryParamsList(path).map((input) => ([input, this.children.query_inputs.getValue(input)]))
  }

  getBodyParamsValues(path = '') {
    return getBodyParamsList(path).map((input) => ([input, this.children.body_inputs.getValue(input)]))
  }
}
