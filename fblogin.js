import { Frontend, nButton } from '@brtmvdl/frontend'
const app = Frontend.fromId('app')
console.log({ app })

const status = new Frontend()

function fb_api_me() {
  console.log('Welcome! Fetching your information...')
  FB.api('/me', function (response) {
    console.log('Successful login for: ' + response.name)
    status.setText('Thanks for logging in, ' + response.name + '!')
  })
}

function fb_login() {
  FB.login(function (response) { console.log('fb_login', { response }) })
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback', { response })
  if (response.status === 'connected') {
    fb_api_me()
  } else if (response.status === 'not_authorized') {
    fb_login()
  } else {
    status.setText('Please log into this webpage.')
  }
}

function fb_get_login_status() {
  FB.getLoginStatus(function (response) { statusChangeCallback(response) })
}

const btn = new nButton()
btn.setText('FB login state')
btn.on('click', () => fb_get_login_status())
app.append(btn)
