import { HTML } from '@brtmvdl/frontend'
import { ScreenHTML, CoinSelectComponent, PriceComponent, DatetimeComponent, BuyButtonComponent, HistoryComponent } from './components/index.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends ScreenHTML {
  state = {
    coin: 'BTCBRL',
    price: 0,
  }

  children = {
    coin: new CoinSelectComponent(),
    price: new PriceComponent(),
    datetime: new DatetimeComponent(),
    buy: new BuyButtonComponent(),
    history: new HistoryComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getCoinSelectComponent())
    this.append(this.getPriceComponent())
    this.append(this.getDatetimeComponent())
    this.append(this.getBuyButtonComponent())
    this.append(this.getHistoryComponent())
    this.update()
  }

  getCoinSelectComponent() {
    this.children.coin.on('change', () => this.onCoinSelectChange())
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
    this.children.buy.on('click', () => this.onBuyButtonClick())
    return this.children.buy
  }

  onBuyButtonClick() {
    Local.add(['moves'], {
      coin: this.state.coin,
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
