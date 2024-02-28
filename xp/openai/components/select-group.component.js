import { HTML, nSelectGroup } from '@brtmvdl/frontend'

export class SelectGroupComponent extends nSelectGroup {
  text = ''
  values = []

  constructor(text = '', values = []) {
    super()
    this.text = text
    this.values = values
  }

  onCreate() {
    super.onCreate()
    this.children.label.setText(this.text)
    Array.from(this.values).map((value) => this.children.select.addOption(value, value))
  }

}
