import { HTML, nButton } from '@brtmvdl/frontend'

class TextHTML extends HTML {
  text = null

  constructor(text = '') {
    super()
    this.text = text
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
  }
}

export class Page extends HTML {
  children = {
    title: new HTML(),
    login_status_button: new nButton(),
    login_button: new nButton(),
    responses: new HTML(),
  }

  onCreate() {
    this.append(this.getLoginStatusButton())
    this.append(this.getLoginButton())
    this.append(this.getResponses())
  }

  getTitle() {
    this.children.title.setText('Facebook JavaScript SDK')
    return this.children.title
  }

  getLoginStatusButton() {
    this.children.login_status_button.setText('Get Login Status')
    this.children.login_status_button.on('click', () => FB.getLoginStatus((resp) => this.onFacebookLoginStatus(resp)))
    return this.children.login_status_button
  }

  onFacebookLoginStatus(resp) {
    this.appendResponse('Get Login Status', resp)
  }

  getLoginButton() {
    this.children.login_button.setText('Login')
    this.children.login_button.on('click', () => FB.login((resp) => this.onFacebookLogin(resp)))
    return this.children.login_button
  }

  onFacebookLogin(resp) {
    this.appendResponse('Login', resp)
  }

  appendResponse(name, resp = {}) {
    const str = JSON.stringify({ name, resp }, null, 4)
    const html = new TextHTML(str)
    this.children.responses.append(html)
  }

  getResponses() {
    return this.children.responses
  }
}
