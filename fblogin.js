import { Frontend, nButton } from '@brtmvdl/frontend'
const app = Frontend.fromId('app')
console.log({ app })

const status = new Frontend()

function statusChangeCallback(response) {
  console.log('statusChangeCallback')
  console.log(response)
  if (response.status === 'connected') {
    testAPI()
  } else {
    status.setText('Please log into this webpage.')
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response)
  })
}

function testAPI() {
  console.log('Welcome!  Fetching your information.... ')
  FB.api('/me', function (response) {
    console.log('Successful login for: ' + response.name)
    status.setText('Thanks for logging in, ' + response.name + '!')
  })
}
const btn = new nButton()
btn.setText('FB login state')
btn.on('click', () => checkLoginState())
app.append(btn)
