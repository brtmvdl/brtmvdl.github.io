import { Model } from './model.js'

export class TextModel extends Model {
  text = ''

  constructor({ text } = {}) {
    super()
    this.text = text
  }

  toJSON() {
    const { text } = this
    return { text }
  }
}
