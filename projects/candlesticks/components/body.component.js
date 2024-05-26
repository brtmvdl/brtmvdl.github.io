import { HTML } from '@brtmvdl/frontend'

export class BodyComponent extends HTML {
  state = {
    klines: [],
    symbol: 'BNBBRL',
    interval: '1s',
    limit: 100,
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setEvents()
    this.append(this.getChart())
    this.apiGetKlines()
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('klines', () => this.drawChart())
  }

  getChart() {
    const chart = new HTML()
    chart.setText('chart')
    return chart
  }

  apiGetKlines() {
    const search = new URLSearchParams({ symbol: this.state.symbol, interval: this.state.interval, limit: this.state.limit })
    return fetch(`https://api4.binance.com/api/v3/klines?${search.toString()}`).then((res) => res.json())
      .then((json) => this.state.klines = json)
      .then(() => this.dispatchEvent('klines'))
  }

  drawChart() {
    // console.log('draw chart', this.state.klines)
  }
}
