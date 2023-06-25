import { nElement } from '../index.js'
import { nFlex } from '../components/flex.js'
import { nInputNumber } from '../components/input-number.js'

export class nInputTime extends nElement {
  flex = new nFlex

  hour = new nInputNumber
  minutes = new nInputNumber

  constructor() {
    super({
      component: { name: 'input-time' }
    })

    this.flex.append(this.makeInput(this.hour))

    const sep = new nElement()
    sep.setText(':')

    sep.setContainerStyle('width', '1rem')

    sep.setStyle('padding-botton', '0.5rem')
    sep.setStyle('padding-top', '0.5rem')
    sep.setStyle('text-align', 'center')
    sep.setStyle('width', '1rem')
    this.flex.append(sep)

    this.flex.append(this.makeInput(this.minutes))

    this.append(this.flex)
  }

  makeInput(input) {
    input.setStyle('width', '100%')
    return input
  }

  getValue() {
    return [
      this.hour.getValue(),
      this.minutes.getValue(),
    ].map((str) => str.toString()).join(' ')
  }

  setValue(value = '') {
    const [hour, minutes] = value.split(' ')
    this.hour.setValue(hour)
    this.minutes.setValue(minutes)
    return this
  }
}
