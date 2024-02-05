import { HTML, nInputTextGroup } from '@brtmvdl/frontend'

export class InputTextGroupComponent extends nInputTextGroup {
  text = ''
  value = ''

  constructor(text = '', value = '') {
    super()
    this.text = text
    this.value = value
  }

  onCreate() {
    super.onCreate()
    this.children.label.setText(this.text)
    this.children.input.setPlaceholder(this.text)
    this.children.input.setValue(this.value)
  }
}
