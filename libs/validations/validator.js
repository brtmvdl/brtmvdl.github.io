
class ErrorSuccess {
  errors = {}

  constructor(errors = {}) {
    this.errors = errors
  }

  getError(key, index = 0) {
    return new Error(this.errors[key]?.[index])
  }

  getMessage(key) {
    return this.errors[key] || ''
  }

  addError(key, value = '') {
    if (!this.errors[key]) {
      this.errors[key] = []
    }

    this.errors[key].push(value)

    return this
  }

  hasErrors() {
    return true
  }
}

export class Validator {
  static validate(form = {}) {
    console.log({ form })

    return {
      with: (validations = {}) => {
        return new Promise((res, rej) => {
          const errors = new ErrorSuccess()

          Object.keys(form).map((key) => {
            const value = form[key]
            const rules = validations[key]

            rules.map((rule) => errors.addError(key, rule(value)))
          })

          errors.hasErrors() ? res({}) : rej(errors)
        })
      }
    }
  }
}
