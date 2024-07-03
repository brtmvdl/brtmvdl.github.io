//

export const uuid = () => Date.now().toString() + (Math.floor((10 ** 20 * Math.random()).toString().length))

export const qrcode = (data = window.location.toString(), size = '150x150') => `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`

export const months = {
  'enus': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export const monthName = (month, language = 'enus') => months[language]?.[month - 1]

export const steps = { '-1': 'comming soon', '0': 'alpha', '1': 'beta', '2': 'staging' }

export const stepName = (step, prefix = '', suffix = '') => (step in steps) ? (prefix + steps[step] + suffix) : ''
