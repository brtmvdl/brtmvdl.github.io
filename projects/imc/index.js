import { HTML } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { getParams } from '../../assets/js/utils/url.js'

export class Page extends PaddingComponent {
  children = {
    weight: new InputComponent({ label: 'weight (kg)', value: 80, type: 'number' }),
    height: new InputComponent({ label: 'height (m)', value: 1.8, type: 'number' }),
    result: new HTML(),
  }

  state = { params: getParams({ title: 'IMC' }) }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: this.state.params.title }))
    this.append(this.getBody())
  }

  getBody() {
    const html = new HTML()
    html.setStyle('max-width', '26rem')
    html.append(this.getWeightInput())
    html.append(this.getHeightInput())
    html.append(new ButtonComponent({ text: 'calc imc', onclick: () => this.onImcButtonClick() }))
    html.append(this.getResultHTML())
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
    const imc = this.calcIMC(weight, height)
    this.children.result.setText(`IMC: ${imc}`)
  }

  getResultHTML() {
    return this.children.result
  }

  calcIMC(weight = 1, height = 1) {
    return (weight / (height * height)).toFixed(4)
  }
}
