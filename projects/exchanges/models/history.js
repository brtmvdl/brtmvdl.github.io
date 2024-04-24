import { Model } from './model.js'
import { getNow } from '../utils/datetime.js'

export class HistoryModel extends Model {
  name = 'history'
  datetime = getNow()

  state = {}

  setDatetime(datetime = getNow()) {
    this.datetime = datetime
    return this
  }

  toJSON() {
    const { name, datetime } = this
    return { name, datetime, [name]: this.state }
  }
}
