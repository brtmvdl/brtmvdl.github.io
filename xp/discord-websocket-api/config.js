// 

export const url = 'wss://gateway.discord.gg/?v=10&encoding=json'

export const token = ''

export const properties = { os: 'linux', browser: 'disco', device: 'disco' }

export const intents = Array.from([0, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 16]).reduce((sum, num) => sum + (1 << num), 0)
