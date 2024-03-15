import { HTML } from '@brtmvdl/frontend'
import { getEventsList, getOpCodeList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

export class FormHTML extends HTML {
  children = {
    event: new SelectComponent(),
    params: new HTML(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEventSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEventSelect() {
    getEventsList().map((endpoint) => this.children.event.addOption(endpoint, endpoint))
    this.children.event.on('change', () => this.onEventSelectChange())
    return this.children.event
  }

  onEventSelectChange() {
    this.children.params.clear()
    getOpCodeList()[this.getEventValue()].params.map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
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

  onSendButtonClick() {
    const opcode = this.getEventOpCode()
    const data = this.getEventData()
    this.dispatchEvent('submit', { opcode, data })
  }

  getEventOpCode() {
    return null
  }

  getEventData() {
    return null
  }

  getEventValue() {
    return this.children.event.getValue()
  }

  getParamsValues(method = '') {
    const values = getEventsList(method).map((input) => ([input, this.children.inputs.getValue(input)]))
    return Array.from(values).reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }
}
