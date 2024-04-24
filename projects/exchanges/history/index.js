import { HTML, nInputTextGroup, nButton, nFlex } from '@brtmvdl/frontend'
import { TopBar } from '../components/topbar.js'
import { datetime2str } from '../utils/datetime.js'
import * as Local from '../utils/local.js'

export class Page extends HTML {
  children = {
    history: new HTML(),
  }

  onCreate() {
    this.append(new TopBar('History'))
    this.append(this.getHistory())
  }

  parsePrice(price = 0, coin = 'R$') {
    return `${coin} ${price.toFixed(2).replace('.', ',')}`
  }

  getHistory() {
    this.children.history.setStyle('margin', '0 auto')
    this.children.history.setStyle('width', '40rem')

    Array.from(Local.get(['history'], [])).map((item) => {
      const history = new nFlex()

      const name = new HTML()
      name.setText(item.name)
      history.append(name)

      const datetime = new HTML()
      datetime.setText(datetime2str(item.datetime))
      history.append(datetime)

      const value = new HTML()
      value.setText(this.parsePrice(item.fund.value))
      history.append(value)

      this.children.history.append(history)
    })

    return this.children.history
  }

}
