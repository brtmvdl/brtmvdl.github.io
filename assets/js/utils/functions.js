//

export const uuid = () => Date.now().toString() + (Math.floor((10 ** 20 * Math.random()).toString().length))

export const qrcode = (data = window.location.toString(), size = '150x150') => `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`
