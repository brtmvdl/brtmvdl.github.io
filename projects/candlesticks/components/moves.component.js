import { HTML, nFlex, nButton, nTable, nTr, nTd } from '../../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../../assets/js/components/two.columns.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { TableComponent } from '../../../assets/js/components/table.component.js'
import { fixDecimals } from '../../../assets/js/utils/math.js'
import * as Local from '../../../assets/js/utils/local.js'

export class MovesComponent extends HTML {
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
    const orders = Array.from(Local.get(['orders'], []))
      .map((order) => {
        order['price'] = +fixDecimals(order['price'])
        return order
      })
    const table = new TableComponent(orders || [])
    this.children.moves.append(table)
  }

  getTwoColumns() {
    return new TwoColumnsComponent({
      html1: this.getMovesComponent(),
      html2: this.getButtonsComponents(),
      widths: ['89%', '09%']
    })
  }

  getMovesComponent() {
    return this.children.moves
  }

  getButtonsComponents() {
    const html = new HTML()
    html.append(new ButtonComponent({ text: 'buy', onclick: () => this.dispatch('buy') }))
    html.append(new ButtonComponent({ text: 'sell', onclick: () => this.dispatch('sell') }))
    return html
  }
}
