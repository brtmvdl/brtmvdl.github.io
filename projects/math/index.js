import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

class CellHTML extends HTML {
  text = ''

  constructor({ text } = {}) {
    super()
    this.text = text
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setEvents()
    this.setText(this.text)
  }

  setStyles() {
    this.setStyle('padding', '2rem')
    this.setStyle('font-size', '2rem')
  }

  setEvents() {
    this.addEventListener('click', () => this.dispatch('input', this.text))
  }
}

class LineHTML extends nFlex {
  cols = []

  constructor({ cols = [] } = {}) {
    super()
    this.cols = cols
  }

  onCreate() {
    super.onCreate()
    Array.from(this.cols).map((col) => this.append(col))
  }
}

export class Page extends PaddingComponent {
  children = {
    result: new HTML(),
    keyboard: new HTML(),
  }

  state = {
    n1: 0,
    n2: 0,
    operator: '+',
    result: '',
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'math' }))
    this.append(this.getResultComponent())
    this.append(this.getKeyboardComponent())
    this.reset()
    this.update()
  }

  getResultComponent() {
    this.children.result.setStyle('text-align', 'center')
    this.children.result.setStyle('font-size', '2rem')
    this.children.result.setStyle('padding', '2rem')
    return this.children.result
  }

  getRandomNumber(max = 100) {
    return Math.floor(Math.random() * max)
  }

  getKeyboardComponent() {
    Array.from([
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['<', '0', '>'],
      ['-', '.', '!'],
    ]).map((line) => {
      const cols = []
      Array.from(line).map((col) => {
        const cell = new CellHTML({ text: col })
        cell.addEventListener('input', ({ value }) => this.onInput(value))
        cols.push(cell)
      })
      this.children.keyboard.append(new LineHTML({ cols }))
    })

    return this.children.keyboard
  }

  onInput(data) {
    this.runKeyboard(data)
    this.update()
  }

  runKeyboard(data) {
    switch (data) {
      case '<': return this.doErase()
      case '>': return this.doNext()
      case '!': return this.doCheckResult()
      default: return this.appendResult(data)
    }
  }

  appendResult(data) {
    this.state.result += data
  }

  doErase() {
    this.state.result = ''
  }

  doNext() {
    this.reset()
  }

  doCheckResult() {
    const isEqual = this.checkResult()
    if (isEqual) this.doNext()
  }

  getcalculatedResult() {
    return +eval(this.getCalc())
  }

  checkResult() {
    const result1 = this.getcalculatedResult().toFixed(1)
    const result2 = (+this.state.result).toFixed(1)
    return result1 == result2
  }

  getResetedValues(op = this.getOpeator()) {
    const max = op == '/' ? 10 : 100
    const n1 = this.getRandomNumber(max)
    const n2 = this.getRandomNumber(max) + 1
    let result = 'Infinity'
    while (result == 'Infinity') result = this.getCalc(n1, op, n2)
    return { n1, op, n2 }
  }

  reset() {
    const { n1, op, n2 } = this.getResetedValues()
    this.state.n1 = n1
    this.state.operator = op
    this.state.n2 = n2
    this.doErase()
  }

  getOpeator() {
    switch (this.getRandomNumber(4)) {
      case 0: return '+'
      case 1: return '-'
      case 2: return '*'
      case 3: return '/'
    }

    return null
  }

  update() {
    this.children.result.setText(`${this.getCalc()} = ${this.state.result}`)
  }

  getCalc(n1 = this.state.n1, operator = this.state.operator, n2 = this.state.n2) {
    return `${n1} ${operator} ${n2}`
  }
}
