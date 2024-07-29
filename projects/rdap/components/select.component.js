import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { nSelect } from './select.js'
import { nLabel } from './label.js'

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
    label: new nLabel(),
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
