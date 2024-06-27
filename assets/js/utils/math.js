// 

export const percent = (x, y, fixed = 4) => `${((x * 100 / y) - 100).toFixed(fixed)}%`
