import { HTML } from '@brtmvdl/frontend'

const symbol = 'BNBBRL', interval = '1m', limit = '40'

const config = { width: (window.width / 2), height: (window.height / 2), length: 10 }

const app = new PIXI.Application({ width: 840, height: 840 })
HTML.fromElement(document.body).append(HTML.fromElement(app.view))

const getColor = (close, open) => {
  switch (true) {
    case close === open: return 0x0000ff
    case close < open: return 0x00ff00
    case close > open: return 0xff0000
  }
}

const drawRect = ({ ix, Open_Time, Open_Price, High_Price, Low_Price, Close_Price } = {}) => {
  console.log({ ix, Open_Time, Open_Price, High_Price, Low_Price, Close_Price })
  //
  const rect = new PIXI.Graphics()
  rect.beginFill(getColor(Close_Price, Open_Price))
  rect.drawRect(((ix * 20) + 10), 0, 10, 10)
  app.stage.addChild(rect)
}

const run = () => fetch(`https://api4.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`).then((res) => res.json())
  .then((arr) => Array.from(arr).map(([Open_Time, Open_Price, High_Price, Low_Price, Close_Price], ix) => drawRect({ ix, Open_Time, Open_Price, High_Price, Low_Price, Close_Price })))
  .then(() => setTimeout(run, 500))

run()
