import { HTML, nInput, nButton } from '@brtmvdl/frontend'
import { FormComponent } from '../../assets/js/components/form.component.js'
import * as GOOGLE from '../../assets/js/utils/googleusercontent.js'
import * as LOCAL from '../../assets/js/utils/local.js'
import * as FLOW from '../../assets/js/utils/flow.js'

export class Page extends HTML {
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
    }
  }

  hasAccessToken() {
    return this.state.hash_params.has('access_token')
  }

  getAccessToken() {
    return this.state.hash_params.get('access_token')
  }

  getTitle() {
    const html = new HTML()
    html.setText('login')
    return html
  }

  getButtons() {
    const html = new HTML()
    html.append(this.getGoogleLoginButton())
    return html
  }

  getGoogleLoginButton() {
    return this.createButton('google login', () => this.children.google_form.submit())
  }

  createButton(text, onclick = (() => { })) {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => onclick())
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
