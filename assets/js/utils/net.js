export const ip = () => fetch('https://api.ipify.org?format=json').then(res => res.json())
