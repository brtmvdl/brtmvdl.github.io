import { HistoryModel } from './history.js'

export class FundModel extends HistoryModel {
  name = 'fund'
  state = { value: 0 }

  setValue(value = 0) {
    this.state.value = value
    this.setDatetime()
    return this
  }

}
