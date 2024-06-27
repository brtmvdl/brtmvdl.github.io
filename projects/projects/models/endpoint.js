import { Model } from '../../../assets/js/models/model.js'
import { DEF_HOURS, DEF_URL } from '../utils/constansts.js'

export class EndPointModel extends Model {
  url = DEF_URL
  hours = DEF_HOURS

  constructor({
    url = DEF_URL,
    hours = DEF_HOURS,
  } = {}) {
    super()

    this.url = url
    this.hours = hours
  }
}
