import { HTML, nLabel, nSelect, nError } from '../index.js'

export class nSelectGroup extends HTML {
  children = {
    label: new nLabel(),
    select: new nSelect(),
    error: new nError(),
  }

  getName() {
    return 'select-group'
  }

  onCreate() {
    this.append(this.getLabel())
    this.append(this.getSelect())
    this.append(this.getError())
  }

  getLabel() {
    return this.children.label
  }

  getSelect() {
    return this.children.select
  }

  getError() {
    return this.children.error
  }

  setError(error = '') {
    this.children.error.setText(error)
    this.children.select.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) red')
    return this
  }

  clearError() {
    this.children.error.setText('')
    this.children.select.setStyle('box-shadow', 'none')
    return this
  }
}
