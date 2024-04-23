// 

const searchParams = new URLSearchParams(window.location.hash.substr('1'))

const access_token = searchParams.get('access_token')

console.log({ access_token })

localStorage.setItem('credentials.token', access_token)

document.write(`access_token: ${access_token}`)
