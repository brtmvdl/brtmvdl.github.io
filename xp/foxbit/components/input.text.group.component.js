import { HTML, nInputTextGroup, nLabel, nInputText, nError } from '@brtmvdl/frontend'
import { InputTextComponent } from './input.text.component.js'

export class InputTextGroupComponent extends nInputTextGroup {
  state = {
    name: '',
    value: '',
    type: '',
  }

  children = {
    label: new nLabel(),
    input: new InputTextComponent(),
    error: new nError(),
  }

  constructor(name, value = '', type = '') {
    super()
    this.state.name = name
    this.state.value = value
    this.state.type = type
  }

  onCreate() {
    super.onCreate()
    this.children.label.setText(this.state.name)
    this.children.input.setValue(this.state.value)
    this.children.input.setAttr('type', this.state.type)
  }
}
