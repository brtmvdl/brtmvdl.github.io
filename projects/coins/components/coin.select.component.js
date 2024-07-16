import { HTML, nSelect } from '../../../assets/js/libs/frontend/index.js'
import { getPairsList } from '../utils/lists.js'

export class CoinSelectComponent extends nSelect {
  onCreate() {
    super.onCreate()
    this.setStyles()
    getPairsList().map(([a, b]) => a + b).map((pair) => this.addOption(pair, pair))
  }

  setStyles() {
    this.setContainerStyle('text-align', 'center')
    this.setStyle('background-color', 'transparent')
    this.setStyle('font-size', '2rem')
    this.setStyle('padding', '1rem')
    this.setStyle('border', 'none')
  }
}
