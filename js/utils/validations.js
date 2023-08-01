
export class Validations {
  static url(errorMessage = 'This field is not an URL.') {
    return (value = '') => {
      const regex = new RegExp('[a-zA-Z][a-zA-Z0-9]+\.(com|net|org)(\.br)?')
      return regex.test(value) ? null : errorMessage
    }
  }

  static required(errorMessage = 'This field is required.') {
    return (value = '') => {
      return !!value ? null : errorMessage
    }
  }
}
