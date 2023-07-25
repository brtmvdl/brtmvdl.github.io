
export class Validator {
  fields = {}

  addField(key, value = '', rules = []) {
    this.fields[key] = {
      value,
      rules
    }

    return this
  }

  isAllValid() {
    return false
  }

  getError(key) {
    console.log('getError', { key }, this.fields[key])

    if (!this.fields[key]) {
      return true
    }

    const { value, rules } = this.fields[key]

    return rules.reduce((valid, rule) => (valid || rule(value)), '')
  }
}
