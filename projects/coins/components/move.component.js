import { HTML } from '../../../assets/js/libs/frontend/index.js'
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
    this.append(new TextComponent(`Amount: ${this.move.amount}`))
    if (this.move.sell_datetime) {
      this.append(new TitleComponent('Sell'))
      this.append(new TextComponent(`Date: ${datetime2str(this.move.sell_datetime)}`))
      this.append(new TextComponent(`Interval: ${this.calcInterval(this.move.buy_datetime, this.move.sell_datetime)}`))
      this.append(new TextComponent(`Price: ${this.move.sell_price}`))
      this.append(new TextComponent(`Diff: ${this.calcDiff(+this.move.buy_price, +this.move.sell_price)}`))
      this.append(new TextComponent(`Gain: ${this.calcGain(+this.move.buy_price, +this.move.sell_price, +this.move.amount)}`))
    } else {
      this.append(new TitleComponent('Now'))
      this.append(new TextComponent(`Date: ${datetime2str()}`))
      this.append(new TextComponent(`Interval: ${this.calcInterval(this.move.buy_datetime)}`))
      this.append(new TextComponent(`Price: ${this.price}`))
      this.append(new TextComponent(`Diff: ${this.calcDiff(+this.move.buy_price, +this.price)}`))
      this.append(new TextComponent(`Gain: ${this.calcGain(+this.move.buy_price, +this.price, +this.move.amount)}`))
      this.append(new SellButtonComponent(this.move, +this.price))
    }
  }

  calcInterval(before = Date.now(), after = Date.now()) {
    return interval2str(after - before)
  }

  calcDiff(before = 0, after = 0) {
    return after - before
  }

  calcGain(before = 0, after = 0, amount = 0) {
    return (after * amount / before) - amount
  }
}
