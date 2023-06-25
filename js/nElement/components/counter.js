import { nElement } from "../index.js"
import { nInputText } from '../components/input-text.js'
import { nFlex } from "../components/flex.js"

export class nCounter extends nElement {
  minus = new nElement
  input = new nInputText
  plus = new nElement

  min = 40
  max = 100
  step = 2

  constructor() {
    super({
      component: { name: 'counter' }
    })

    const flex = new nFlex
    flex.setStyle('border-radius', 'calc(1rem / 8)')
    flex.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    flex.setStyle('width', '60%')

    this.minus.setText('-')
    this.minus.setStyle('padding', '0.5rem')
    this.minus.setStyle('cursor', 'pointer')
    this.minus.on('click', () => this.input.setValue(Math.max(this.min, +this.input.getValue() - this.step)))
    flex.append(this.minus)

    this.input.setValue('50')
    this.input.setStyle('text-align', 'center')
    flex.append(this.input)

    this.plus.setText('+')
    this.plus.setStyle('padding', '0.5rem')
    this.plus.setStyle('cursor', 'pointer')
    this.plus.on('click', () => this.input.setValue(Math.min(this.max, +this.input.getValue() + this.step)))
    flex.append(this.plus)

    this.append(flex)
  }

  getMin() {
    return this.min
  }

  setMin(value = 0) {
    this.min = value

    return this
  }

  getMax() {
    return this.max
  }

  setMax(value = 0) {
    this.max = value

    return this
  }

  getValue() {
    return this.input.getValue()
  }
}