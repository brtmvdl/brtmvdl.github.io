import { HTML } from '@brtmvdl/frontend'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { getParams } from '../../assets/js/utils/url.js'

export class Page extends HTML {
  children = {
    weight: new InputComponent({ label: 'weight (kg)', value: '1' }),
    height: new InputComponent({ label: 'height (m)', value: '1' }),
    result: new HTML(),
  }

  state = { params: getParams() }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getTitle())
    this.append(this.getWeightInput())
    this.append(this.getHeightInput())
    this.append(new ButtonComponent({ text: 'calc imc', onclick: () => this.onImcButtonClick() }))
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

  onImcButtonClick() {
    const weight = this.children.weight.getValue()
    const height = this.children.height.getValue()
    const imc = this.getIMC(weight, height)
    this.children.result.setText(`IMC: ${imc}`)
  }

  getResultHTML() {
    this.children.result.setStyle('padding', '1rem 0rem')
    return this.children.result
  }

  getIMC(weight = 1, height = 1) {
    return (weight / (height * height)).toFixed(4)
  }
}
