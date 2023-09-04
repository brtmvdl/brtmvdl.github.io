import { Frontend, nButton } from '@brtmvdl/frontend'
const app = Frontend.fromId('app')
console.log({ app })

const fb_app = {
  statusChangeCallback: (key, ...values) => {
    console.log('FB', key, ...values)
  },
  checkLoginState: () => {
    FB.getLoginStatus((response) => fb_app.statusChangeCallback('checkLoginState', { response }))
  },
}

const btn = new nButton()
btn.setText('FB login state')
btn.on('click', () => fb_app.checkLoginState())
app.append(btn)
