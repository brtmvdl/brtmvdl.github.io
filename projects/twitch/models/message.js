import { Model } from '../../../assets/js/models/model.js'

export class MessageModel extends Model {
  text = ''
  data = {}

  constructor(text, data = {}) {
    super()
    this.text = text
    this.data = data
  }

}
