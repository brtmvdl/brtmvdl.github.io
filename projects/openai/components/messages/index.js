import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { ButtonComponent } from '../button.component.js'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { LinkComponent } from '../link.component.js'
import { CardBodyHTML } from '../card-body.html.js'
import { CardHTML } from '../card.html.js'
import { TextHTML } from '../text.html.js'
import * as str from '../../../../assets/js/utils/str.js'

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
    if (this.data.output?.rateLimits?.length) this.append(this.getRateLimitsHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    const flex = new nFlex()
    const method = new TextHTML(this.data.method)
    const link = new LinkComponent()
    link.href('#' + (this.data.side == 'output' ? this.data.output.id : this.data.id))
    link.append(method)
    flex.append(link)
    flex.append(new TextHTML(this.data.side))
    header.append(flex)
    return header
  }

  getBodyHTML() {
    const body = new CardBodyHTML()
    switch (this.data.side) {
      case 'none': body.append(this.getNoneHTML()); break;
      case 'input': body.append(this.getInputHTML()); break;
      case 'output': body.append(this.getOutputHTML()); break;
      case 'error': body.append(this.getErrorHTML()); break;
    }

    return body
  }

  getRateLimitsHTML() {
    const ratelimits = new CardBodyHTML()
    const table = this.getTableHTML(this.data.output.rateLimits)
    table.setStyle('width', '100%')
    ratelimits.append(table)
    return ratelimits
  }

  getNoneHTML() {
    return new TextHTML('none message')
  }

  getInputHTML() {
    return new TextHTML(JSON.stringify(this.data.input))
  }

  getOutputHTML() {
    return new TextHTML(JSON.stringify(this.data.output.result))
  }

  getErrorHTML() {
    const { code, msg } = this.data.output.error
    const error = new HTML()
    error.append(new TextHTML(`Code: ${code}`))
    error.append(new TextHTML(`Message: ${msg}`))
    return error
  }

  getFooterHTML() {
    const { id } = this.data.input
    const footer = new CardFooterHTML()
    footer.append(new TextHTML(str.timestamp2str(id)))
    return footer
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
    if (rows.length === 0) return new HTML()
    const table = new nTable()
    table.setStyle('border', '1px solid #000000')
    table.setStyle('border-collapse', 'collapse')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}
