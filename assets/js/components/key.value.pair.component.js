import { TextComponent } from './text.component.js'

export class KeyValuePairComponent extends TextComponent {
  getName() { return 'key-value-pair-component' }

  constructor({ key = '', value = '', separator = ':' } = {}) {
    super({ text: `${key}${separator} ${value}` })
  }
}
