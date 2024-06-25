import { Model } from './model.js'

export class WebSocketMessageModel extends Model {
  name = ''
  params = []

  constructor(name, params = []) {
    super()
    this.name = name
    this.params = params
  }

}
