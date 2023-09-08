import { Frontend, nButton } from '@brtmvdl/frontend'

const app = Frontend.fromId('app')

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

  switch (response.status) {
    case 'connected': return fb_api_me()
    case 'not_authorized': return fb_login()
  }

  status.setText('Please log into this webpage.')
}

function fb_get_login_status() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response)
  })
}

const btn = new nButton()
btn.setText('FB login state')
btn.on('click', () => fb_get_login_status())
app.append(btn)

const link = new nLink()
link.setText('FB login')
link.href(`?${Date.now()}`)
app.append()
