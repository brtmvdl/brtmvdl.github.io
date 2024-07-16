import { HTML } from '../../../assets/js/libs/frontend/index.js'
import * as Local from '../../../assets/js/utils/local.js'
import { MoveComponent } from './move.component.js'

export class HistoryComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('margin', '1rem 0rem')
  }

  update(price, coin) {
    this.clear()
    Array.from(Local.get(['moves'], []))
      .filter((move) => move.coin == coin)
      .map((move) => this.append(new MoveComponent(move, price)))
  }
}
