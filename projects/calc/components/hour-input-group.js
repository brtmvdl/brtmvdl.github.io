import { nElement } from '../../../js/nElement/index.js'
import { nFlex, nGroup, nInputNumber, nInputText } from '../../../js/nElement/components/index.js'
import * as COLORS from '../utils/colors.js'

export class HourInputGroup extends nGroup {
  input = new nInputText()
  text = new nElement()

  constructor() {
    super({
      component: { name: 'contract-input-group' }
    })

    // LABEL
    this.label.setText('hour')
    this.append(this.label)

    // INPUT
    this.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    // TEXT
    this.text.setText('$')
    this.text.setStyle('height', '100%')
    this.text.setStyle('padding', '0.5rem 1rem')
    this.text.setStyle('color', COLORS.WHITE)
    this.text.setStyle('background-color', COLORS.BLACK)
    this.text.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    // INPUT GROUP
    const inputGroup = new nFlex()
    inputGroup.append(this.input)
    inputGroup.append(this.text)
    this.append(inputGroup)

    // ERROR
    this.append(this.error)

  }
}
