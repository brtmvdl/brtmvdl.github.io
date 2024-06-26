import { Model } from './model.js'

export class WebSocketMessageModel extends Model {
  name = ''
  params = []
  extras = []

  constructor(name, params = [], extras = []) {
    super()
    this.name = name
    this.params = params
    this.extras = extras
  }

  getExtra(extra) {
    return this.extras.map((e) => e.toString().split('=')).find(([key]) => key == extra)?.[1]
  }

}
