import { HTML, nInput } from '../../assets/js/libs/frontend/index.js'
import { getParams } from './params.js'

export class InputComponent extends HTML {
  children = {
    label: new HTML(),
    input: new nInput(),
  }

  state = {
    label: '',
    value: '',
    params: getParams()
  }

  constructor(label = '', value = '') {
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
    // this.children.label.setStyle('margin', 'calc(1rem / 4) 0')
    return this.children.label
  }

  getInput() {
    this.children.input.setValue(this.state.value)
    this.children.input.setPlaceholder(this.state.label)
    this.children.input.setStyle('background-color', this.state.params.bgcolor)
    this.children.input.setStyle('box-shadow', '0rem 0rem 0rem 1px #000000')
    this.children.input.setStyle('color', this.state.params.color)
    // this.children.input.setStyle('margin', 'calc(1rem / 4) 0')
    this.children.input.setStyle('box-sizing', 'border-box')
    this.children.input.setStyle('display', 'inline-block')
    this.children.input.setStyle('border', 'none')
    this.children.input.setStyle('width', '100%')
    return this.children.input
  }

  getValue() {
    return this.children.input.getValue()
  }
}
