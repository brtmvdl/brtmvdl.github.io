import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { getSymbolList } from '../utils/lists/symbol.list.js'
import { getIntervalList } from '../utils/lists/interval.list.js'

export class ChartsComponent extends HTML {
  children = {
    charts: new HTML(),
  }

  state = {
    klines: [],
    symbol: getSymbolList()[0],
    interval: getIntervalList()[0],
    limit: 100,
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setCharts()
    this.append(this.getChart())
  }

  setEvents() {
    this.addEventListener('input', (data) => this.onInput(data))
  }

  onInput({ value: { form: { symbol, interval, } } }) {
    this.state.symbol = symbol
    this.state.interval = interval
  }

  getChart() {
    this.children.charts.setStyle('min-height', '600px')
    return this.children.charts
  }

  apiGetKlines() {
    return fetch(this.getURL()).then((res) => res.json())
      .then((json) => this.state.klines = json)
      .then(() => this.drawChart())
      .then(() => this.apiGetKlines())
  }

  getURL() {
    const search = new URLSearchParams({ symbol: this.state.symbol, interval: this.state.interval, limit: this.state.limit })
    return `https://api3.binance.com/api/v3/klines?${search.toString()}`
  }

  getPrice() {
    return Array.from(this.state.klines).map((kline) => kline[4]).find(() => true)
  }

  setCharts() {
    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(() => this.apiGetKlines())
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable(this.getData(), true)
    const chart = new google.visualization.CandlestickChart(this.children.charts.element)
    chart.draw(data, { legend: 'none' })
  }

  getData() {
    return Array.from(this.state.klines)
      .map(([kline_open_time, open_price, high_price, low_price, close_price]) => ([new Date(kline_open_time), +low_price, +open_price, +close_price, +high_price]))
      .filter((_, ix) => ix < 10)
  }

}
