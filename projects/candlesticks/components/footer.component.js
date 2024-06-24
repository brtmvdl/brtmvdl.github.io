import { HTML, nFlex, nButton, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import * as Local from '../../../assets/js/utils/local.js'

class TableHTML extends nTable {
  constructor(data = [], headers = []) {
    super()
    this.data = data
    this.headers = headers.length ? headers : Object.keys(this.data?.[0] || {})
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
    this.updateMoves()
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('update', () => this.onUpdate())
  }

  onUpdate() {
    this.updateMoves()
  }

  updateMoves() {
    this.children.moves.clear()
    const table = new TableHTML(Local.get(['orders'], []) || [])
    this.children.moves.append(table)
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

  getBuyButton() {
    return new ButtonComponent('buy', () => this.dispatchEvent('buy'))
  }

  getSellButton() {
    return new ButtonComponent('sell', () => this.dispatchEvent('sell'))
  }

}
