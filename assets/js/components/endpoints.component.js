import { HTML } from '@brtmvdl/frontend'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'

export class EndpointsComponent extends HTML {
  children = {
    select: new SelectComponent({}),
    form: new HTML(),
    inputs: {},
  }

  state = {
    endpoints: [],
  }

  constructor(endpoints = [], inputs = {}) {
    super()
    this.state.endpoints = endpoints
    this.children.inputs = inputs
  }

  getName() { return 'endpoints-component' }

  onCreate() {
    super.onCreate()
    this.append(this.getEndpointsSelect())
    this.append(this.getForm())
    this.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
  }

  getEndpointsSelect() {
    Array.from(this.state.endpoints).map(({ name }) => this.children.select.addOption(name, name))
    this.children.select.on('change', () => this.onEndpointsSelectChange())
    return this.children.select
  }

  onEndpointsSelectChange() {
    this.children.form.clear()
    const inputs = this.getEndpointInputs()
  }

  getEndpointInputs(endpoint = this.children.select.getValue()) {
    const { query } = this.getEndpoint(endpoint)
    Array.from(query).map((q) => this.children.form.append(this.children.inputs[q]))
  }

  getForm() {
    return this.children.form
  }

  onSendButtonClick() {
    const endpoint = this.getEndpoint()
    const query = this.getEndpointQuery()
    this.dispatchEvent('send', { endpoint, query })
  }

  getEndpoint(endpoint = this.children.select.getValue()) {
    return Array.from(this.state.endpoints).find(({ name }) => name == endpoint)
  }

  getEndpointQuery(endpoint = this.children.select.getValue()) {
    const { query } = this.getEndpoint(endpoint)
    return Array.from(query).reduce((params, q) => ({ ...params, [q]: this.children.inputs[q].getValue() }), {})
  }
}
