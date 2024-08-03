// 

export const months = {
  'enus': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export const monthName = (month, language = 'enus') => months[language]?.[month - 1]
