import { HTML, nSelect } from '@brtmvdl/frontend'
import { getPairsList } from '../utils/lists.js'

export class CoinSelectComponent extends nSelect {
  onCreate() {
    super.onCreate()
    getPairsList().map(([a, b]) => a + b).map((pair) => this.addOption(pair, pair))
  }
}
