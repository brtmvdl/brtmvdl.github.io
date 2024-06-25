import { HTML, nFlex } from '@brtmvdl/frontend'
import { ButtonComponent } from '../../assets/js/components/button.component.js'

export class Page extends HTML {
  children = {
    input: new HTML(),
    result: new HTML(),
  }

  onCreate() {
    super.onCreate()
    const app = this.getAppHTML()
    app.append(this.getInputHTML())
    app.append(this.getResultHTML())
    app.append(this.getNumbersHTML())
    this.append(app)
  }

  getAppHTML() {
    const app = new HTML()
    app.setStyle('margin', '0 auto')
    app.setStyle('width', '20rem')
    return app
  }

  getInputHTML() {
    this.children.input.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.children.input.setStyle('min-height', '2rem')
    return this.children.input
  }

  getResultHTML() {
    this.children.result.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.children.result.setStyle('min-height', '2rem')
    return this.children.result
  }

  getNumbersHTML() {
    const flex = new nFlex()
    const numbers = new HTML()
    const n1 = new nFlex()
    n1.append(this.createButton('1'))
    n1.append(this.createButton('2'))
    n1.append(this.createButton('3'))
    numbers.append(n1)
    const n2 = new nFlex()
    n2.append(this.createButton('4'))
    n2.append(this.createButton('5'))
    n2.append(this.createButton('6'))
    numbers.append(n2)
    const n3 = new nFlex()
    n3.append(this.createButton('7'))
    n3.append(this.createButton('8'))
    n3.append(this.createButton('9'))
    numbers.append(n3)
    const n4 = new nFlex()
    n4.append(this.createButton('0'))
    n4.append(this.createButton('CE'))
    n4.append(this.createButton('='))
    numbers.append(n4)
    flex.append(numbers)
    const ops = new HTML()
    ops.append(this.createButton('+'))
    ops.append(this.createButton('-'))
    ops.append(this.createButton('*'))
    ops.append(this.createButton('/'))
    flex.append(ops)
    return flex
  }

  createButton(char) {
    const button = new ButtonComponent(char, () => this.onButtonClick(char))
    button.setStyle('box-sizing', 'border-box')
    button.setStyle('padding', '1rem')
    button.setStyle('margin', '0rem')
    button.setStyle('border', 'none')
    button.setStyle('height', '5rem')
    button.setStyle('width', '5rem')
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
