import { Frontend, nButton } from '@brtmvdl/frontend'
const app = Frontend.fromId('app')
console.log({ app })

function statusChangeCallback(response) {
  console.log('statusChangeCallback')
  console.log(response)
  if (response.status === 'connected') {
    testAPI()
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this webpage.'
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
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!'
  })
}
const btn = new nButton()
btn.setText('FB login state')
btn.on('click', () => checkLoginState())
app.append(btn)
