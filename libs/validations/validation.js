
export class Validation {
  static url(message = 'Invalid URL.') {
    const regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
    return (value) => regex.test(value) ? null : message
  }

  static required(message = '') {
    return (value) => !!value ? null : message 
  }
}
