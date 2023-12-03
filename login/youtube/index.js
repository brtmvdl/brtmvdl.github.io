import { HTML, nButton } from '@brtmvdl/frontend'

import { API_KEY } from './config.js'

import * as GoogleUserContent from './googleusercontent.js'

export class Page extends HTML {
  children = {
    login_button: new nButton()
  }

  onCreate() {
    this.append(this.getLoginButton())

    this.initGoogleClient()
  }

  getLoginButton() {
    this.children.login_button.setText('login')

    this.children.login_button.on('click', () => console.log('login'))

    return this.children.login_button
  }

  initGoogleClient() {
    const apiKey = GoogleUserContent.default.web.client_secret

    gapi.client.init({ apiKey })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', err))
  }
}
