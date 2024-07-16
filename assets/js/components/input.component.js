import { HTML, nInput } from '../../../assets/js/libs/frontend/index.js'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: '',
    type: 'text',
    placeholder: '',
  }

  children = {
    label: new HTML(),
    input: new nInput(),
    error: new HTML(),
  }

  constructor({ label = '', value = '', type = 'text', placeholder = '' } = {}) {
    super()
    this.state.label = label
    this.state.value = value
    this.state.type = type
    this.state.placeholder = label || placeholder
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
    this.append(this.getError())
  }

  getLabel() {
    if (this.state.label) this.children.label.setText(this.state.label)
    return this.children.label
  }

  getInput() {
    this.children.input.setPlaceholder(this.state.placeholder?.toString())
    this.children.input.setValue(this.state.value?.toString())
    this.children.input.setAttr('type', this.state.type?.toString())
    this.children.input.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.children.input.setStyle('padding', 'calc(1rem / 4)')
    this.children.input.setStyle('box-sizing', 'border-box')
    this.children.input.setStyle('width', '100%')
    return this.children.input
  }

  getError() {
    return this.children.error
  }

  getValue() {
    return this.children.input.getValue()
  }
}
