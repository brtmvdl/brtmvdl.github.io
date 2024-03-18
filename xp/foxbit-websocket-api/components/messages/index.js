import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { TextHTML } from '../text.html.js'
import { CardHTML } from '../card.html.js'

import * as str from '../../../../assets/js/utils/str.js'

export class MessageCardHTML extends CardHTML {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.setText(this.data.Endpoint)
    return header
  }

  getBodyHTML() {
    const body = new CardBodyHTML()
    body.setText('body')
    return body
  }

  getFooterHTML() {
    const footer = new CardFooterHTML()
    footer.append(new TextHTML(str.datetime2str(this.data.id)), this.data.id)
    return footer
  }
}

export class tableMessage extends MessageCardHTML {
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
    table.setStyle('padding', 'calc(1rem / 2)')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}

export class emptyMessage extends MessageCardHTML {
  getBodyHTML() {
    return new HTML()
  }
}

export class logMessage extends MessageCardHTML { }

export class openMessage extends emptyMessage { }

export class closeMessage extends emptyMessage { }
