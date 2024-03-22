// 

export const fixDecimals = (n) => +n.toString().replace(/(.)999999.+/, (_, x) => x + 1).replace(/000000.+/, 0)
