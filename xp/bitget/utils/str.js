import * as config from '../config.js'

export const getSign = (timestamp, method, pathname, secretKey = config.secretKey) => CryptoJS.enc.Base64.Stringify(CryptoJS.HmacSHA256(timestamp + method + pathname, secretKey))
