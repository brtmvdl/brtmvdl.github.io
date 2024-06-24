import { TextComponent } from './text.component.js'

export class KeyValueHTML extends TextComponent {
  constructor(key, value = null) {
    super(`${key}: ${value}`)
  }
}
