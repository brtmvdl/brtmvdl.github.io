import { HTML } from '@brtmvdl/frontend'
import { datetime2str, interval2str } from '../../../assets/js/utils/str.js'
import { SellButtonComponent } from './sell.button.component.js'
import { TitleComponent } from './title.component.js'
import { TextComponent } from './text.component.js'

export class MoveComponent extends HTML {
  move = null
  price = 0

  constructor(move = {}, price = 0) {
    super()
    this.move = move
    this.price = price
  }

  onCreate() {
    this.append(new TitleComponent('Coin'))
    this.append(new TextComponent(this.move.coin))
    this.append(new TitleComponent('Buy'))
    this.append(new TextComponent(`Date: ${datetime2str(this.move.buy_datetime)}`))
    this.append(new TextComponent(`Price: ${this.move.buy_price}`))
    if (this.move.sell_datetime) {
      this.append(new TitleComponent('Sell'))
      this.append(new TextComponent(`Interval: ${this.calcInterval(this.move.buy_datetime, this.move.sell_datetime)}`))
      this.append(new TextComponent(`Diff: ${this.calcDiff(+this.move.buy_price, +this.move.sell_price)}`))
    } else {
      this.append(new TitleComponent('Now'))
      this.append(new TextComponent(`Interval: ${this.calcInterval(this.move.buy_datetime)}`))
      this.append(new TextComponent(`Diff: ${this.calcDiff(+this.move.buy_price, +this.price)}`))
      this.append(new SellButtonComponent(this.move, +this.price))
    }
    this.append(new TextComponent(''))
  }

  calcInterval(before = Date.now(), after = Date.now()) {
    return interval2str(after - before)
  }

  calcDiff(before = 0, after = 0) {
    return after - before
  }
}
