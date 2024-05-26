import { HTML, nFlex, nButton, nTable, nTr, nTd } from '@brtmvdl/frontend'
import * as Local from '../../../assets/js/utils/local.js'

class TableHTML extends nTable {
  constructor(data = [], headers = []) {
    super()
    this.data = data
    this.headers = headers.length ? headers : Object.keys(this.data[0])
  }

  onCreate() {
    super.onCreate()
    this.createHeaders()
    this.createBody()
  }

  createHeaders() {
    const header = new nTr()
    Array.from(this.headers).map((key) => {
      const td = new nTd()
      td.setText(key)
      header.append(td)
    })
    this.append(header)
  }

  createBody() {
    const self = this
    Array.from(this.data).map((line) => {
      const tr = new nTr()
      Object.keys(line).map((key) => {
        const td = new nTd()
        td.setText(line[key])
        tr.append(td)
      })
      self.append(tr)
    })
  }
}

export class FooterComponent extends HTML {
  children = {
    moves: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setEvents()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('update', () => this.onUpdate())
  }

  onUpdate() {
    this.children.moves.clear()
    this.children.moves.append(new TableHTML(Local.get(['orders'], [])))
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  getLeft() {
    const left = new HTML()
    left.append(this.children.moves)
    return left
  }

  getRight() {
    const right = new nFlex()
    right.append(this.getBuyButton())
    right.append(this.getSellButton())
    return right
  }

  createButton(text, onclick = (() => { }), color = '#000000') {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => onclick())
    button.setStyle('background-color', color)
    button.setStyle('color', '#ffffff')
    button.setStyle('border', 'none')
    return button
  }

  getBuyButton() {
    return this.createButton('buy', () => this.dispatchEvent('buy'), '#00cc00')
  }

  getSellButton() {
    return this.createButton('sell', () => this.dispatchEvent('sell'), '#cc0000')
  }
}
