import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { nInput } from './input.js'
import { nLabel } from './label.js'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: [],
  }

  children = {
    label: new nLabel(),
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
    this.children.label.setStyle('padding', 'calc(1rem / 4)')
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
