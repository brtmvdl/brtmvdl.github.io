
export class KeyValuePair {
  key = ''
  value = ''

  constructor(key, value = '') {
    this.key = key
    this.value = value
  }

  toJSON() {
    const { key, value } = this
    return { key, value }
  }
}
