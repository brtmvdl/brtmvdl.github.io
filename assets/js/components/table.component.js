import { HTML, nTable, nTr, nTd } from '../../../assets/js/libs/frontend/index.js'

export class TableComponent extends nTable {
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
