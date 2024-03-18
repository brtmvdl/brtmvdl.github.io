import { TextHTML } from './text.html.js'

export class KeyValueHTML extends TextHTML {
  constructor(key, value = null) {
    super(`${key}: ${value}`)
  }
}
