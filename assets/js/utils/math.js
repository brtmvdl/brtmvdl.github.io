// 

export const percent = (x, y, fixed = 4) => `${((x * 100 / y) - 100).toFixed(fixed)}%`

export const fixDecimals = (n) => +n.toString().replace(/(.)999999.+/, (_, x) => +x + 1).replace(/000000.+/, 0)
