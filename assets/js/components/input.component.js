import { HTML, nInput } from '@brtmvdl/frontend'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: '',
    type: 'text',
  }

  children = {
    label: new HTML(),
    input: new nInput(),
    error: new HTML(),
  }

  constructor(label, value = '', type = 'text') {
    super()
    this.state.label = label
    this.state.value = value
    this.state.type = type
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
    this.append(this.getError())
  }

  getLabel() {
    this.children.label.setText(this.state.label)
    return this.children.label
  }

  getInput() {
    this.children.input.setPlaceholder(this.state.label)
    this.children.input.setValue(this.state.value)
    this.children.input.setAttr('type', this.state.type)
    this.children.input.setStyle('padding', 'calc(1rem / 4)')
    this.children.input.setStyle('box-sizing', 'border-box')
    this.children.input.setStyle('width', '100%')
    return this.children.input
  }

  getError() {
    return this.children.error
  }

  getValue() {
    return this.getInput().getValue()
  }
}
