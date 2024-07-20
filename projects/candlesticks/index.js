import { HTML } from '../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ChartsComponent } from './components/charts.component.js'
import { MovesComponent } from './components/moves.component.js'
import { FormComponent } from './components/form.component.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends PaddingComponent {
  children = {
    form: new FormComponent(),
    charts: new ChartsComponent(),
    moves: new MovesComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'candlesticks' }))
    this.append(new TwoColumnsComponent({ html1: this.getLeft(), html2: this.getRight(), }))
  }

  setEvents() {
    this.addEventListener('update', () => this.children.moves.dispatch('update'))
    this.children.form.addEventListener('update', ({ value: data }) => this.update({ form: data }))
    this.children.moves.addEventListener('buy', () => this.saveMove({ side: 'buy' }))
    this.children.moves.addEventListener('sell', () => this.saveMove({ side: 'sell' }))
  }

  getLeft() {
    return this.getForm()
  }

  getForm() {
    return this.children.form
  }

  getRight() {
    const html = new HTML()
    html.append(this.getChartsComponent())
    html.append(this.getMovesComponent())
    return html
  }

  getChartsComponent() {
    return this.children.charts
  }

  getMovesComponent() {
    return this.children.moves
  }

  saveMove(params = {}) {
    Local.add(['orders'], {
      symbol: this.children.form.getSymbol(),
      type: 'LIMIT',
      quantity: this.children.form.getQuantity(),
      price: this.children.charts.getPrice(),
      timeInForce: 'GTC',
      timestamp: Date.now(),
      ...params
    })
    this.dispatch('update')
  }

  update(data = {}) {
    this.children.form.dispatch('input', data)
    this.children.charts.dispatch('input', data)
  }
}
