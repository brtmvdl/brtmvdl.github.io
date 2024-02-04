import { HTML, nSelectGroup } from '@brtmvdl/frontend'

export class SelectGroupComponent extends nSelectGroup {
  state = {
    text: '',
  }

  constructor(text = '') {
    super()
    this.state.text = text
  }

  onCreate() {
    super.onCreate()
    this.children.label.setText(this.state.text)
  }

  getValue() {
    return this.children.select.getValue()
  }
}
