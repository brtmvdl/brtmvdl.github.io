import { HTML, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { CardComponent } from '../../../../assets/js/components/card.component.js'
import { CardHeaderComponent } from '../../../../assets/js/components/card.header.component.js'
import { CardBodyComponent } from '../../../../assets/js/components/card.body.component.js'
import { CardFooterComponent } from '../../../../assets/js/components/card.footer.component.js'
import { TextComponent } from '../../../../assets/js/components/text.component.js'
import { timestamp2str } from '../../../../assets/js/utils/str.js'

export class MessageComponent extends CardComponent {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
    this.append(this.getFooterComponent())
  }

  getHeaderComponent() {
    const header = new CardHeaderComponent()
    header.append(this.getHeaderHTML())
    return header
  }

  getHeaderHTML() { return new TextComponent(this.data.request.name) }

  getBodyComponent() {
    const body = new HTML()
    body.append(this.getRequestComponent())
    body.append(this.getResponseComponent())
    return body
  }

  getRequestComponent() {
    const body = new CardBodyComponent()
    body.append(this.getRequestHTML())
    return body
  }

  getRequestHTML() { return new HTML() }

  getResponseComponent() {
    const body = new CardBodyComponent()
    body.append(this.getResponseHTML())
    return body
  }

  getResponseHTML() { return new HTML() }

  getFooterComponent() {
    const footer = new CardFooterComponent()
    footer.append(this.getFooterHTML())
    return footer
  }

  getFooterHTML() {
    const now = Date.now()
    const timestamp = timestamp2str(now)
    return new TextComponent(now, timestamp)
  }

  createData(text) {
    const td = new nTd()
    td.setStyle('border', '1px solid #000000')
    td.setStyle('padding', 'calc(1rem / 4)')
    td.setText(text)
    return td
  }

  createRow(arr) {
    const tr = new nTr()
    Array.from(arr).map((text) => tr.append(this.createData(text)))
    return tr
  }

  getTableHTML(rows = [], ths = null) {
    const table = new nTable()
    table.setStyle('border', '1px solid #000000')
    table.setStyle('border-collapse', 'collapse')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}
