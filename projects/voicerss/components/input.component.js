import { HTML } from '@brtmvdl/frontend'
import { nInput } from './input.js'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: [],
  }

  children = {
    label: new HTML(),
    input: new nInput(),
  }

  constructor(label, value = []) {
    super()
    this.state.label = label
    this.state.value = value
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
  }

  getLabel() {
    this.children.label.setText(this.state.label)
    return this.children.label
  }

  getInput() {
    this.children.input.setValue(this.state.value)
    return this.children.input
  }

  getValue() {
    return this.children.input.getValue()
  }
}
