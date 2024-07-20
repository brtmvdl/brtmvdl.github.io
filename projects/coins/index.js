import { HTML } from '../../assets/js/libs/frontend/index.js'
import { AmountInputComponent, CoinSelectComponent, PriceComponent, DatetimeComponent, BuyButtonComponent, HistoryComponent } from './components/index.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends HTML {
  state = {
    coin: 'BTCBRL',
    price: 0,
  }

  children = {
    amount: new AmountInputComponent(),
    coin: new CoinSelectComponent(),
    price: new PriceComponent(),
    datetime: new DatetimeComponent(),
    buy: new ButtonComponent({ text: 'Buy (BRL 100)', onclick: () => this.onBuyButtonClick() }),
    history: new HistoryComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getAmountInputComponent())
    this.append(this.getCoinSelectComponent())
    this.append(this.getPriceComponent())
    this.append(this.getDatetimeComponent())
    this.append(this.getBuyButtonComponent())
    this.append(this.getHistoryComponent())
    this.update()
  }

  getAmountInputComponent() {
    this.children.amount.setValue(100)
    this.children.amount.addEventListener('keyup', () => this.onAmountInputKeyUp())
    return this.children.amount
  }

  onAmountInputKeyUp() {
    this.children.buy.setText(`Buy (BRL ${this.getAmountValue()})`)
  }

  getAmountValue() {
    return this.children.amount.getValue()
  }

  getCoinSelectComponent() {
    this.children.coin.addEventListener('change', () => this.onCoinSelectChange())
    return this.children.coin
  }

  onCoinSelectChange() {
    this.state.coin = this.children.coin.getValue()
  }

  getPriceComponent() {
    return this.children.price
  }

  getDatetimeComponent() {
    return this.children.datetime
  }

  getBuyButtonComponent() {
    return this.children.buy
  }

  onBuyButtonClick() {
    Local.add(['moves'], {
      coin: this.state.coin,
      amount: this.getAmountValue(),
      buy_datetime: Date.now(),
      buy_price: this.state.price,
    })
  }

  getHistoryComponent() {
    return this.children.history
  }

  getApiPrice(symbol = '') {
    return fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${symbol}`).then(res => res.json())
  }

  update() {
    this.getApiPrice(this.state.coin)
      .then((res) => this.state.price = +res.price)
      .then(() => this.children.price.update(this.state.price))
      .then(() => this.children.history.update(this.state.price, this.state.coin))
      .then(() => this.children.datetime.update())
      .then(() => this.update())
      .catch((err) => console.error(err))
  }
}
