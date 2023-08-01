import { nComponent, nError, nInputText, nLabel } from '../index.js'

export class nGroup extends nComponent {
  children = {
    label: new nLabel(),
    input: new nInputText(),
    error: new nError(),
  }

  getName() {
    return 'group'
  }

  setError(error = '') {
    this.children.error.setText(error)
    this.children.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) red')
    return this
  }

  clearError() {
    this.children.error.setText('')
    this.children.input.setStyle('box-shadow', 'none')
    return this
  }
}
