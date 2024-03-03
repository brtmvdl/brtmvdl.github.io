import { HTML, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { CardHTML } from '../card.html.js'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { TextHTML } from '../text.html.js'

export class MessageCardHTML extends CardHTML {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.setAttr('id', this.data.id)
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.append(new TextHTML(this.data.method))
    return header
  }

  getBodyHTML() {
    const html = new HTML()
    html.append(this.getInputHTML())
    html.append(this.getOutputHTML())
    return html
  }

  getInputHTML() {
    const input = new CardBodyHTML()
    input.append(this.getMethodAndPathNameHTML())
    return input
  }

  getMethodAndPathNameHTML() {
    const { method, pathname } = this.data.input
    const html = new HTML()
    html.setText(`${method} ${pathname}`)
    return html
  }

  getOutputHTML() {
    const output = new CardBodyHTML()
    output.append(new TextHTML(JSON.stringify(this.data.output)))
    return output
  }

  getFooterHTML() {
    return new CardFooterHTML()
  }
}

export class TableMessageCardHTML extends MessageCardHTML {
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
    if (rows.length === 0) return new HTML()
    const table = new nTable()
    table.setStyle('border', '1px solid #000000')
    table.setStyle('border-collapse', 'collapse')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}

export class SystemStatusMessageCardHTML extends MessageCardHTML {
  getOutputHTML() {
    const { status, msg } = this.data.output
    const output = new CardBodyHTML()
    output.append(new TextHTML(`Status: ${status}`))
    output.append(new TextHTML(`Msg: ${msg}`))
    return output
  }
}
