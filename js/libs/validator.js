
export class Validator {
  state = {
    current_field: '',
    fields: {},
  }

  addField(field) {
    this.state.current_field = field

    this.state.fields[field] = {
      field,
      value: null,
      rules: [],
      errors: [],
      onError: [],
      onValidate: [],
    }

    return this
  }

  setValue(value = null, field = this.state.current_field) {
    this.state.fields[field].value = value
    return this
  }

  setRules(rules = [], field = this.state.current_field) {
    this.state.fields[field].rules = rules
    return this
  }

  onError(fn = (() => { }), field = this.state.current_field) {
    this.state.fields[field].onError.push(fn)
    return this
  }

  onValidate(fn = (() => { }), field = this.state.current_field) {
    this.state.fields[field].onValidate.push(fn)
    return this
  }

  validateAll() {
    return Object.keys(this.state.fields)
      .map((field) => ({ field, ...this.state.fields[field] }))
      .map(({ field, value, rules, errors }) => {

        this.state.fields[field].errors = []

        const fieldErrors = rules
          .map((rule) => rule(value))
          .filter((error) => error)
          .map((error) => {
            this.state.fields[field].errors.push(error)
          })

        if (fieldErrors.length) {
          this.state.fields[field].onError.map((fn) => fn())
        } else {
          this.state.fields[field].onValidate.map((fn) => fn())
        }

        return fieldErrors
      })
  }

  isValid() {
    this.validateAll()

    return Object.keys(this.state.fields)
      .map((field) => this.state.fields[field])
      .filter((field) => field.errors.length > 0)
      .length == 0
  }

  getError(field) {
    return this.state.fields[field].error || null
  }
}
