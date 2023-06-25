import { nElement } from '../index.js'
import { nFlex } from '../components/flex.js'
import { nInputNumber } from '../components/input-number.js'

export class nInputDate extends nElement {
  flex = new nFlex

  day = new nInputNumber
  month = new nInputNumber
  year = new nInputNumber

  constructor() {
    super({
      component: { name: 'input-date' }
    })

    this.flex.append(this.makeInput(this.day))
    this.flex.append(this.makeSeparator('/'))
    this.flex.append(this.makeInput(this.month))
    this.flex.append(this.makeSeparator('/'))
    this.flex.append(this.makeInput(this.year))

    this.append(this.flex)
  }

  makeInput(input) {
    input.setStyle('width', '100%')
    return input
  }

  makeSeparator(text) {
    const sep = new nText()

    sep.setContainerStyle('width', '1rem')
    sep.setStyle('width', '1rem')

    sep.setStyle('text-align', 'center')
    sep.setStyle('padding-top', '0.5rem')
    sep.setStyle('padding-botton', '0.5rem')

    sep.setText(text)

    return sep
  }

  getValue() {
    return [
      this.day.getValue(),
      this.month.getValue(),
      this.year.getValue(),
    ].map((value) => value.toString()).join(' ')
  }

  setValue(value = '') {
    const [day, month, year] = value.split(' ')
    this.day.setValue(day)
    this.month.setValue(month)
    this.year.setValue(year)
    return this
  }
}
