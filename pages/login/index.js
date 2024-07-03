import { HTML, nH1, nInput, nButton } from '@brtmvdl/frontend'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { FormComponent } from '../../assets/js/components/form.component.js'
import * as GOOGLE from '../../assets/js/utils/googleusercontent.js'
import * as LOCAL from '../../assets/js/utils/local.js'
import * as FLOW from '../../assets/js/utils/flow.js'
import * as API from '../../assets/js/utils/api.js'

export class Page extends PaddingComponent {
  children = {
    google_form: new FormComponent(),
  }

  state = {
    hash_params: new URLSearchParams(window.location.hash.substr('1')),
  }

  onCreate() {
    super.onCreate()
    if (this.hasAccessToken()) {
      LOCAL.set(['access_token'], this.getAccessToken())
      FLOW.goTo('/?access_token=1')
    } else {
      this.append(this.getTitle())
      this.append(this.getButtons())
      this.append(this.getGoogleForm())
      this.append(this.getTwitterLoginButton())
    }
  }

  hasAccessToken() {
    return this.state.hash_params.has('access_token')
  }

  getAccessToken() {
    return this.state.hash_params.get('access_token')
  }

  getTitle() {
    const h1 = new nH1()
    h1.setText('login')
    return h1
  }

  getButtons() {
    const html = new HTML()
    html.append(this.getGoogleLoginButton())
    return html
  }

  getGoogleLoginButton() {
    return this.createButton('google', () => this.children.google_form.submit())
  }

  getTwitterLoginButton() {
    return this.createButton('twitter', () => this.onTwitterLogin())
  }

  onTwitterLogin() {
    API.twitter.oauth.request_token()
      .then((res) => this.onRequestToken(res))
      .catch((err) => console.error(err))
  }

  onRequestToken(res) {
    console.log({ res })
  }

  createButton(text, onclick = (() => { })) {
    const button = new ButtonComponent(text, onclick)
    button.setStyle('border', 'none')
    button.setStyle('padding', '1rem')
    button.setStyle('color', '#ffffff')
    button.setStyle('background-color', '#000000')
    return button
  }

  getGoogleForm() {
    this.children.google_form.setAttr('method', 'GET')
    this.children.google_form.setAttr('action', GOOGLE.auth_uri)

    Object.keys(GOOGLE).filter((key) => (typeof GOOGLE[key]) === 'string').map((key) => {
      const input = new nInput()
      input.setAttr('type', 'hidden')
      input.setAttr('name', key)
      input.setValue(GOOGLE[key])
      this.children.google_form.append(input)
    })

    return this.children.google_form
  }

}
