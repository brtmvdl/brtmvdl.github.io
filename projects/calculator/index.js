import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

export class Page extends PaddingComponent {
  children = {
    input: new HTML(),
    result: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'calculator' }))
    this.append(new TwoColumnsComponent({
      html1: this.getInputsHTML(),
      html2: this.getNumbersHTML(),
      widths: ['59%', '39%']
    }))
  }

  getInputsHTML() {
    const html = new HTML()
    html.append(this.getInputHTML())
    html.append(this.getResultHTML())
    return html
  }

  getInputHTML() {
    this.children.input.setStyle('font-size', '2rem')
    this.children.input.setStyle('line-height', '2rem')
    this.children.input.setStyle('margin-bottom', '2rem')
    this.children.input.setStyle('padding', 'calc(1rem / 4)')
    return this.children.input
  }

  getResultHTML() {
    this.children.result.setStyle('font-size', '2rem')
    this.children.result.setStyle('line-height', '2rem')
    this.children.result.setStyle('margin-bottom', '2rem')
    this.children.result.setStyle('padding', 'calc(1rem / 4)')
    return this.children.result
  }

  getNumbersHTML() {
    const numbers = new HTML()
    const n1 = new nFlex()
    n1.append(this.createButton('1'))
    n1.append(this.createButton('2'))
    n1.append(this.createButton('3'))
    n1.append(this.createButton('+'))
    numbers.append(n1)
    const n2 = new nFlex()
    n2.append(this.createButton('4'))
    n2.append(this.createButton('5'))
    n2.append(this.createButton('6'))
    n2.append(this.createButton('-'))
    numbers.append(n2)
    const n3 = new nFlex()
    n3.append(this.createButton('7'))
    n3.append(this.createButton('8'))
    n3.append(this.createButton('9'))
    n3.append(this.createButton('*'))
    numbers.append(n3)
    const n4 = new nFlex()
    n4.append(this.createButton('0'))
    n4.append(this.createButton('CE'))
    n4.append(this.createButton('='))
    n4.append(this.createButton('/'))
    numbers.append(n4)
    return numbers
  }

  createButton(char) {
    const button = new ButtonComponent({ text: char, onclick: () => this.onButtonClick(char) })
    button.setStyle('box-sizing', 'border-box')
    button.setStyle('margin', '0rem')
    button.setStyle('border', 'none')
    button.setStyle('height', '5rem')
    button.setContainerStyle('width', '100%')
    return button
  }

  onButtonClick(char) {
    switch (char) {
      case '=': return this.setResultText()
      case 'CE': return this.clearResultText()
      default: return this.addInputText(char)
    }
  }

  setResultText() {
    this.children.result.setText(eval(this.children.input.getText()))
  }

  clearResultText() {
    this.children.input.setText('')
    this.children.result.setText('')
  }

  addInputText(char) {
    const input = this.children.input.getText() || ''
    this.children.input.setText(input + char)
  }

}
