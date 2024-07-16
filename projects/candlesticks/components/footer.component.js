import { HTML, nFlex, nButton, nTable, nTr, nTd } from '../../../assets/js/libs/frontend/index.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import * as Local from '../../../assets/js/utils/local.js'

import { TwoColumnsComponent } from '../../../assets/js/components/two.columns.component.js'

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
    this.setEvents()
    this.append(this.getTwoColumns())
    this.updateMoves()
  }

  setEvents() {
    this.addEventListener('update', () => this.onUpdate())
  }

  onUpdate() {
    this.updateMoves()
  }

  updateMoves() {
    this.children.moves.clear()
    const table = new TableHTML(Local.get(['orders'], []) || [])
    this.children.moves.append(table)
  }

  getTwoColumns() {
    return new TwoColumnsComponent({
      html1: this.getMovesComponent(),
      html2: this.getButtonsComponents(),
    })
  }

  getMovesComponent() {
    return this.children.moves
  }

  getButtonsComponents() {
    return new TwoColumnsComponent({
      html1: new ButtonComponent({ text: 'buy', onclick: () => this.dispatch('buy') }),
      html2: new ButtonComponent({ text: 'sell', onclick: () => this.dispatch('sell') }),
    })
  }
}
