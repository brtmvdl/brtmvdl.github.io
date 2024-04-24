import { HTML, nH2, nFlex, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    input: new HTML(),
    result: new HTML(),
  }

  onCreate() {
    super.onCreate()
    const app = this.getAppHTML()
    app.append(this.getTitleHTML())
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

  getTitleHTML() {
    const title = new nH2()
    title.setStyle('padding', '1rem')
    title.setStyle('text-align', 'center')
    title.setText('Calculator')
    return title
  }

  getInputHTML() {
    this.children.input.setStyle('background-color', '#000000')
    this.children.input.setStyle('margin', 'calc(1rem / 2)')
    this.children.input.setStyle('min-height', '1rem')
    this.children.input.setStyle('color', '#ffffff')
    this.children.input.setStyle('padding', '1rem')
    return this.children.input
  }

  getResultHTML() {
    this.children.result.setStyle('background-color', '#000000')
    this.children.result.setStyle('margin', 'calc(1rem / 2)')
    this.children.result.setStyle('min-height', '1rem')
    this.children.result.setStyle('color', '#ffffff')
    this.children.result.setStyle('padding', '1rem')
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
    const button = new HTML()
    button.setText(char)
    button.on('click', () => this.onButtonClick(char))
    button.setStyle('background-color', '#000000')
    button.setStyle('margin', 'calc(1rem / 2)')
    button.setStyle('display', 'inline-block')
    button.setStyle('color', '#ffffff')
    button.setStyle('padding', '1rem')
    button.setStyle('height', '2rem')
    button.setStyle('width', '2rem')
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
  }

  addInputText(char) {
    const input = this.children.input.getText() || ''
    this.children.input.setText(input + char)
  }
}
