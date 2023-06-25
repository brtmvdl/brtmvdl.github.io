import { nElement } from '../index.js'
import { nInputText } from '../components/input-text.js'
import { nLabel } from '../components/label.js'
import { nError } from '../components/error.js'

export class nGroup extends nElement {
  label = new nLabel
  input = new nInputText
  error = new nError

  getValue() {
    return this.input.getValue()
  }

  setError(error = new Error, { color = true, text = true } = {}) {
    if (text) this.error.setText(error.message)

    if (color) this.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #ff0000')
  }

  clearError() {
    this.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    this.error.setText('')
  }
}
