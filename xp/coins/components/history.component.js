import { HTML } from '@brtmvdl/frontend'
import * as Local from '../../../assets/js/utils/local.js'
import { MoveComponent } from './move.component.js'

export class HistoryComponent extends HTML {
  update(price, coin) {
    this.clear()
    Array.from(Local.get(['moves'], []))
      .filter((move) => move.coin == coin)
      .map((move) => this.append(new MoveComponent(move, price)))
  }
}
