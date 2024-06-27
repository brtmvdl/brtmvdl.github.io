import { Model } from '../../../assets/js/models/model.js'

export class PriceModel extends Model {
  value = 0
  datetime = Date.now()

  constructor(value = 0, datetime = Date.now()) {
    super()
    this.value = value
    this.datetime = datetime
  }

  toJSON() {
    const { value, datetime } = this
    return { value, datetime }
  }

  fromJSON({ value, datetime } = {}) {
    this.value = value
    this.datetime = datetime
    return this
  }
}
