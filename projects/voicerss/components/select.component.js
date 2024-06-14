import { HTML, nSelect } from '@brtmvdl/frontend'

export class SelectComponent extends HTML {
  state = {
    label: '',
    values: [],
  }

  constructor(label, values = []) {
    super()
    this.state.label = label
    this.state.values = values
  }

  children = {
    label: new HTML(),
    select: new nSelect(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getSelect())
  }

  getLabel() {
    this.children.label.setText(this.state.label)
    return this.children.label
  }

  getSelect() {
    Array.from(this.state.values).map((v) => this.children.select.addOption(v, v))
    return this.children.select
  }

  getValue() {
    return this.children.select.getValue()
  }
}
