import { HTML, nFlex, nTable, nTr, nTd } from '../../../assets/js/libs/frontend/index.js'
import { MessageModel } from '../models/message.model.js'
import { CardComponent } from './card.component.js'
import { TextComponent } from './text.component.js'
import { CardHeaderComponent } from './card.header.component.js'
import { CardBodyComponent } from './card.body.component.js'
import { CardFooterComponent } from './card.footer.component.js'
import * as str from '../../../assets/js/utils/str.js'

export class MessageCardComponent extends CardComponent {
  message = new MessageModel()

  constructor(message = new MessageModel()) {
    super()
    this.message = message
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
    this.append(this.getFooterComponent())
  }

  getHeaderComponent() {
    const card = new CardHeaderComponent()
    const flex = new nFlex()
    flex.append(new TextComponent({ text: this.message.Endpoint }))
    flex.append(new TextComponent({ text: this.message.Side }))
    card.append(flex)
    return card
  }

  getBodyComponent() {
    return new CardBodyComponent()
  }

  getFooterComponent() {
    const card = new CardFooterComponent()
    card.append(new TextComponent({ text: this.message.Id, title: str.datetime2str(this.message.Id) }))
    return card
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

  getTableHTML(rows = [], headers = null) {
    if (rows.length === 0) return new HTML()
    const table = new nTable()
    table.setStyle('border', '1px solid #000000')
    table.setStyle('border-collapse', 'collapse')
    table.append(this.createRow(Array.from(headers === null ? Object.keys(rows[0]) : headers)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}
