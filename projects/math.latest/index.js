import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'

const app = HTML.fromId('app')

class Screen extends HTML {
  children = {
    operation: new HTML(),
    result: new HTML(),
  }

  state = {
    n1: 0,
    n2: 0,
    operator: '',
    operation: '',
    result: '',
  }

  onCreate() {
    this.createGame()
  }

  createGame() {
    this.clearResult()
    this.createOperation()
    this.createScreen()
  }

  clearResult() {
    this.state.result = ''
  }

  randomNumber(num) {
    return Math.floor(Math.random() * num)
  }

  getOperator(num) {
    const operators = ['+', '-', '*']
    return operators[num % operators.length]
  }

  createOperation() {
    this.state.n1 = this.randomNumber(100)
    this.state.n2 = this.randomNumber(100)
    this.state.operator = this.getOperator(this.randomNumber(100))
  }

  createScreen() {
    this.clear()

    const flex = new HTML()

    flex.setStyle('text-align', 'center')
    flex.setStyle('font-size', '2em')
    flex.setStyle('padding', '2em')

    const { n1, n2, operator } = this.state
    this.state.operation = `${n1} ${operator} ${n2}`
    flex.setText(`${this.state.operation} = ${this.state.result}`)

    this.append(flex)
  }

  getResult() {
    switch (this.state.operator) {
      case '+': return this.state.n1 + this.state.n2
      case '-': return this.state.n1 - this.state.n2
      case '*': return this.state.n1 * this.state.n2
    }

    return null
  }

  checkResult() {
    if (+this.state.result === this.getResult()) this.createGame()
  }

  addResultNumber(num) {
    this.state.result += num
    this.createScreen()
    return this
  }

  deleteResultNumber() {
    this.state.result = this.state.result.substring(0, this.state.result.length - 1)
    this.createScreen()
    return this
  }
}

const screen = new Screen()
app.append(screen)

const keyboard = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['<', '0', '>'],
  ['-', ' ', '!'],
].map((line = []) => {
  const lineEl = new nFlex()
  line.map((cell) => {
    const cellEl = new HTML()
    cellEl.setStyle('text-align', 'center')
    cellEl.setStyle('font-size', '2em')
    cellEl.setStyle('height', '2em')
    cellEl.setStyle('width', '2em')
    cellEl.setText(cell)
    cellEl.addEventListener('click', () => {
      switch (true) {
        case Number.isInteger(+cell): return screen.addResultNumber(cell)
        case cell === '!': return screen.checkResult()
        case cell === '-': return screen.addResultNumber('-')
        case cell === '<': return screen.deleteResultNumber()
        case cell === '>': return screen.createGame()
      }
    })
    lineEl.append(cellEl)
  })
  app.append(lineEl)
})
