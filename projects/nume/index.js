import { HTML, nFlex, nH1, nButton } from '../../assets/js/libs/frontend/index.js'

class nText extends HTML { }

class nNumber extends HTML {
  num = 0

  constructor() {
    super({
      element: { tagName: 'p' },
      component: { name: 'number' },
    })

    this.setNumber(this.num)
  }

  setText() {
    throw new Error('Can not do this.')
  }

  setNumber(num) {
    this.num = num
    super.setText(this.num)
    return this
  }

  add(num = 1) {
    this.num += num
    super.setText(this.num)
    return this
  }

  sub(num = 1) {
    this.num -= num
    super.setText(this.num)
    return this
  }
}

class nCell extends HTML {
  constructor() {
    super({
      component: { name: 'cell' },
    })

    this.setStyle('background-color', '#dcb')
    this.setStyle('display', 'inline-block')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    // this.setStyle('color', '#fff')
    this.setStyle('margin', `1rem`)
  }
}

class nGrid extends HTML {
  cells = []

  static SMALL = 'small'
  static MEDIUM = 'medium'
  static LARGE = 'large'

  constructor() {
    super({
      component: { name: 'grid-component' },
    })

    this.setStyle('background-color', '#cba')
    this.setStyle('padding', `1rem`)
  }

  setGrid(grid) {
    if ([nGrid.SMALL, nGrid.MEDIUM, nGrid.LARGE].indexOf(grid) === -1) {
      throw new Error('Can not do this.')
    }

    const self = this

    let width = 4
    let length = 6

    if (grid === nGrid.MEDIUM) {
      width = 5.5
      length = 5
    }

    if (grid === nGrid.SMALL) {
      width = 7
      length = 4
    }

    for (let l = 0; l < length; l++) {
      const line = new nFlex()

      for (let c = 0; c < length; c++) {
        const cell = new nCell()

        cell.setData('line', l)
        cell.setData('column', c)

        cell.setStyle('line-height', `${width}rem`)
        cell.setStyle('height', `${width}rem`)
        cell.setStyle('width', `${width}rem`)

        cell.addEventListener('click', () => {
          const event = new Event('cellclick')
          event.cell = cell
          self.element.dispatch(event)
        })

        this.cells.push({ line: l, column: c, place: cell })
        line.append(cell)
      }

      this.append(line)
    }
  }

  setTextInCell(text, line, column) {
    const cell = this.cells.find((cell) => cell.line === line && cell.column === column)
    if (cell) cell.place.setText(text)
    return this
  }
}

class nScore extends HTML {
  counter = new nNumber()
  text = new nText()

  constructor() {
    super({
      component: { name: 'score-component' },
    })

    this.setStyle('background-color', '#cba')
    this.setStyle('margin', '0 0 1rem 1rem')
    this.setStyle('text-align', 'center')
    this.setStyle('padding', '.5rem')
    this.setStyle('width', '5rem')

    this.counter.setStyle('color', '#ffffff')
    this.counter.setStyle('font-weight', 'bold')
    this.append(this.counter)

    this.text.setStyle('color', '#ffffff')
    this.text.setStyle('font-size', '.75rem')
    this.append(this.text)
  }
}

class nMarginAuto extends HTML {
  constructor() {
    super({
      component: { name: 'margin-auto' },
    })

    this.setStyle('width', '40rem')
    this.setStyle('margin', '0 auto')
  }
}

HTML.fromElement(document.body)
  .setStyle('margin', '1rem 0')
  .setStyle('padding', '0')
  .setStyle('background-color', '#faf8ef')
  .setStyle('color', '#776e65')
  .setStyle('font-family', '"Clear Sans", "Helvetica Neue", Arial, sans-serif')
  .setStyle('font-size', '16px')

const app = HTML.fromId('app')

const marginAuto = new nMarginAuto()

const head = new nFlex()

const title = new nH1()
title.setText('Nume')
head.append(title)

const score = new nFlex()

const gameScore = new nScore()
gameScore.text.setText('Atual')
score.append(gameScore)

const oldScore = new nScore()
oldScore.text.setText('Anteriores')
score.append(oldScore)

head.append(score)

marginAuto.append(head)

const buttons = new nFlex()

const largeButton = new nButton()
largeButton.setText('Large 6')
largeButton.addEventListener('click', () => { game.play(nGrid.LARGE) })

const mediumButton = new nButton()
mediumButton.setText('Medium 5')
mediumButton.addEventListener('click', () => { game.play(nGrid.MEDIUM) })

const smallButton = new nButton()
smallButton.setText('Small 4')
smallButton.addEventListener('click', () => { game.play(nGrid.SMALL) })

marginAuto.append(buttons)

const body = new HTML()

const square = new nGrid()

marginAuto.append(square)

app.append(marginAuto)

class Game {
  score = 0

  grid_size = nGrid.SMALL
  length = 4

  chosen = []
  current_numbers = []

  parseLength() {
    switch (this.grid_size) {
      case nGrid.SMALL: this.length = 4; break;
      case nGrid.MEDIUM: this.length = 5; break;
      case nGrid.LARGE: this.length = 6; break;
    }
  }

  showScore() {
    gameScore.counter.setNumber(this.score)
    oldScore.counter.setNumber(0)
  }

  loss() {
    const self = this
    return self.chosen.some((num, ix) => self.chosen.indexOf(num) !== ix)
  }

  showLoss({ num }) {
    // TODO
  }

  keep() {
    this.score++

    this.showScore()
    this.clearNumbers()
    this.setNumbers()
  }

  makeGrid() {
    const self = this

    square.setGrid(self.grid_size)
    square.addEventListener('cellclick', ({ cell }) => {
      const num = +cell.getText()
      const line = +cell.getData('line')
      const column = +cell.getData('column')

      self.chosen.push(num)
      self.loss() ? self.showLoss({ num, line, column }) : self.keep()
    })
  }

  randomNumber(length) {
    return Math.floor(Math.random() * length)
  }

  clearNumbers() {
    this.current_numbers.map(({ line, column }) => {
      square.setTextInCell('', line, column)
    })
  }

  setNumbers() {
    const space = this.length * this.length
    let numbers_amount = Math.max(this.randomNumber(space), this.length) + 1
    this.current_numbers = []

    while (numbers_amount--) {
      const num = this.randomNumber(100)
      let line = -1, column = -1, exists = false

      do {
        line = this.randomNumber(this.length)
        column = this.randomNumber(this.length)
        exists = this.current_numbers
          .find((crt) => crt.line === line && crt.column === column)
      } while (exists)

      this.current_numbers.push({ num, line, column })
      square.setTextInCell(num, line, column)
    }
  }

  play(size) {
    this.grid_size = size
    this.parseLength()
    this.showScore()
    this.makeGrid()
    this.setNumbers()
  }
}

const game = new Game()
game.play(nGrid.SMALL)
