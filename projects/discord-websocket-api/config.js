// 

export const url = 'wss://gateway.discord.gg/?v=10&encoding=json'

export const token = ''

export const properties = { os: 'linux', browser: 'disco', device: 'disco' }

export const intents = Array.from([9, 10, 11, 12, 13, 14, 15]).reduce((sum, num) => sum + (1 << num), 0)

console.log({ intents })
