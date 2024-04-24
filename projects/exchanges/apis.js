import * as Ajax from './ajax.js'

class Exchange {
  getAllValues() { return new Promise() }
}

class BinanceExchange extends Exchange {
  state = {
    symbols: ["BTCBRL", "USDTBRL", "ETHBRL", "XRPBRL", "BNBBRL", "MATICBRL", "SOLBRL", "LINKBRL", "LTCBRL", "AVAXBRL", "DOGEBRL", "ADABRL", "DOTBRL", "BUSDBRL", "CHZBRL"],
  }

  getAllValues() {
    const symbols = "[" + this.state.symbols.map((s) => '"' + s + '"').join(',') + "]"

    return Ajax.get(`https://api4.binance.com/api/v3/ticker/price?symbols=${symbols}`)
      .then((res) => res.getData().map(({ symbol, price }) => ({ symbol, price: (+price) })))
  }

  addSymbol(symbol = null) {
    if (symbol) this.state.symbols.push(symbol)
    return this
  }

  removeSymbol(symbol = null) {
    this.state.symbols = this.state.symbols.filter((s) => s !== symbol)
    return this
  }
}

export const binance = new BinanceExchange()

class FoxbitExchange extends Exchange { }

export const foxbit = new FoxbitExchange()

class BybitExchange extends Exchange { }

export const bybit = new BybitExchange()
