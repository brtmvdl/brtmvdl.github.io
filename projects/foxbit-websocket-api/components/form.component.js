import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { getEndpointsList, getInputEndpointsList } from '../lists/endpoints.list.js'
import { InputsComponent } from './inputs.component.js'

const inputs = new InputsComponent()

export class FormComponent extends HTML {
  children = {
    select: new SelectComponent(),
    inputs: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getSelectComponent())
    this.append(this.getInputs())
  }

  setEvents() {
    this.children.select.addEventListener('change', () => this.onSelectComponentChange())
  }

  getSelectValue() {
    return this.children.select.getValue()
  }

  getEndpointByName(name = this.getSelectValue()) {
    return getEndpointsList().find((e) => e.name == name)
  }

  onSelectComponentChange() {
    this.children.inputs.clear()
    const params = this.getEndpointByName()?.params
    Array.from(params).map((param) => this.children.inputs.append(inputs.getComponent(param)))
  }

  getSelectComponent() {
    getInputEndpointsList().map(({ name }) => this.children.select.addOption(name, name))
    return this.children.select
  }

  getInputs() {
    const html = new HTML()
    html.append(this.children.inputs)
    html.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
    return html
  }

  onSendButtonClick() {
    const name = this.getSelectValue()
    const params = this.getEndpointByName(name)?.params
    const values = Array.from(params).map((param) => [param, inputs.getValue(param)])
    this.dispatch('submit', { name, values })
  }

}
