import { HTML } from '@brtmvdl/frontend'
import { InputComponent } from './input.component.js'
import { ButtonComponent } from './button.component.js'
import { getParams } from './params.js'

export class Page extends HTML {

  children = {
    weight: new InputComponent('weight (kg)', 1),
    height: new InputComponent('height (m)', 1),
    imc_button: this.getImcButton(),
    result: new HTML(),
  }

  state = { params: getParams() }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getTitle())
    this.append(this.getWeightInput())
    this.append(this.getHeightInput())
    this.append(this.getImcButton())
    this.append(this.getResultHTML())
  }

  setStyles() {
    this.setStyle('margin', '0 auto')
    this.setStyle('height', '20rem')
    this.setStyle('width', '20rem')
  }

  getTitle() {
    const html = new HTML()
    html.setStyle('font-size', '2rem')
    html.setStyle('padding', '1rem 0rem')
    html.setText(this.state.params.title)
    return html
  }

  getWeightInput() {
    return this.children.weight
  }

  getHeightInput() {
    return this.children.height
  }

  getImcButton() {
    return new ButtonComponent(
      'calc imc',
      () => {
        const weight = this.children.weight.getValue()
        const height = this.children.height.getValue()
        const imc = this.getIMC(weight, height)
        this.children.result.setText(`IMC: ${imc}`)
      }
    )
  }

  getResultHTML() {
    this.children.result.setStyle('padding', '1rem 0rem')
    return this.children.result
  }

  getIMC(weight = 1, height = 1) {
    return (weight / (height * height)).toFixed(4)
  }
}
