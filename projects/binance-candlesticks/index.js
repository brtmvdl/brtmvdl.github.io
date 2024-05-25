// https://developers.google.com/chart/interactive/docs/gallery/candlestickchart

// https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data

const app = document.getElementById('app')
const options = { legend: 'none', };

google.charts.load('current', { 'packages': ['corechart'] })
google.charts.setOnLoadCallback(() => run())

const padLeft = (text, length = 1, pad = ' ') => {
  while (text.length < length) text = pad.toString() + text.toString()
  return text.toString()
}

const get_date_string = (datetime = Date.now()) => {
  const date = new Date(datetime)

  return `${date.getFullYear()}${padLeft(date.getMonth() - 1, 2, '0')}${padLeft(date.getDate(), 2, '0')}${padLeft(date.getHours(), 2, '0')}${padLeft(date.getMinutes(), 2, '0')}${padLeft(date.getSeconds(), 2, '0')}`
}

const klines = (symbol = 'BTCUSDT', interval = '1m', limit = 20) => {
  const search = (new URLSearchParams({ symbol, interval, limit })).toString()
  const url = (new URL(`https://api4.binance.com/api/v3/klines?${search}`)).toString()
  return fetch(url).then((res) => res.json())
    .then((arr) => Array.from(arr).map(([kline_open_time, open_price, high_price, low_price, close_price]) => ([new Date(kline_open_time), +open_price, +high_price, +low_price, +close_price,])))
    .catch((err) => console.error(err))
}

const run = () => {
  const chart = new google.visualization.CandlestickChart(app)
  const draw = (data) => chart.draw(google.visualization.arrayToDataTable(data, true), options)
  const update = () => klines().then((arr) => draw(arr)).then(() => setTimeout(() => update(), 10000))
  update()
}
