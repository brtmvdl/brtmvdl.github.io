import { HTML, nInputTextGroup } from '@brtmvdl/frontend'

export class InputTextGroupComponent extends nInputTextGroup {
  state = {
    label: '',
    text: '',
    type: 'text',
  }

  constructor(label, text = '', type = 'text') {
    super()
    this.state.label = label
    this.state.text = text
    this.state.type = type
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setLabelStyles()
    this.setInputStyles()
    this.setErrorStyles()
  }

  setLabelStyles() {
    this.children.label.setText(this.state.label)
    this.children.label.setStyle('margin', 'calc(1rem / 4)')
  }

  setInputStyles() {
    this.children.input.setAttr('type', this.state.type)
    this.children.input.setText(this.state.text)
    this.children.input.setStyle('padding', 'calc(1rem / 4)')
    this.children.input.setStyle('margin', 'calc(1rem / 4)')
  }

  setErrorStyles() { }
}
