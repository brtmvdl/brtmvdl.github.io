export const required = (errorMessage = 'This field is required.') => (value) => !!value ? null : errorMessage

export const url = (errorMessage = 'This URL is invalid.') => (value) => {
  const regexp = new RegExp('[a-z]+\.(com|net|org)(\.br)?')

  return regexp.test(value) ? null : errorMessage
}
