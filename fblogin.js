import { Frontend, nButton } from '@brtmvdl/frontend'
const app = Frontend.fromId('app')
console.log({ app })

const fb_app = {
  log: (key, ...values) => fb_app.log('FB', key, ...values),
  testAPI: () => {
    fb_app.log('Welcome!  Fetching your information.... ')
    FB.api('/me', (response) => {
      fb_app.log('Successful login for: ' + response.name,)
      fb_app.log('Thanks for logging in, ' + response.name + '!')
    })
  },
  statusChangeCallback: (response) => {
    fb_app.log('statusChangeCallback', { response })

    if (response.status === 'connected') {
      fb_app.testAPI()
    } else {
      fb_app.log('Please log into this webpage.')
    }
  },
  checkLoginState: () => {
    FB.getLoginStatus((response) => fb_app.statusChangeCallback(response))
  },
}

const btn = new nButton()
btn.setText('FB login state')
btn.on('click', () => fb_app.checkLoginState())
app.append(btn)
