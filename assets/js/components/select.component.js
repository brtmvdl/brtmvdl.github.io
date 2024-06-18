import { HTML, nSelect } from '@brtmvdl/frontend'

export class SelectComponent extends HTML {
  state = {
    label: '',
  }

  children = {
    label: new HTML(),
    input: new nSelect(),
    error: new HTML(),
  }

  constructor(label = '') {
    super()
    this.state.label = label
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
    return this.children.input
  }

  getError() {
    return this.children.error
  }
}
