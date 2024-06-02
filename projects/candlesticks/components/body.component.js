import { HTML } from '@brtmvdl/frontend'

export class BodyComponent extends HTML {
  children = {
    charts: new HTML(),
  }

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
    this.setCharts()
    this.append(this.getChart())
    this.apiGetKlines()
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('klines', () => this.drawChart())
  }

  onSymbolUpdate(data = {}) {
    console.log('on symbol update', data)
  }

  onIntervalUpdate(data = {}) {
    console.log('onIntervalUpdate', data)
  }

  getChart() {
    this.children.charts.setStyle('min-height', '600px')
    return this.children.charts
  }

  apiGetKlines() {
    const search = new URLSearchParams({ symbol: this.state.symbol, interval: this.state.interval, limit: this.state.limit })
    return fetch(`https://api4.binance.com/api/v3/klines?${search.toString()}`).then((res) => res.json())
      .then((json) => this.state.klines = json)
      .then(() => this.dispatchEvent('klines'))
      .then(() => this.apiGetKlines())
  }

  getPrice() {
    return Array.from(this.state.klines).map((kline) => kline[4]).find(() => true)
  }

  setCharts() {
    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(() => this.drawChart())
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable(this.getData(), true)
    const chart = new google.visualization.CandlestickChart(this.children.charts.element)
    chart.draw(data, { legend: 'none' })
  }

  getData() {
    return Array.from(this.state.klines)
      .map(([kline_open_time, open_price, high_price, low_price, close_price]) => ([new Date(kline_open_time), +open_price, +low_price, +high_price, +close_price]))
      .filter((_, ix) => ix < 10)
  }
}
