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
    responses: new HTML(),
  }

  onCreate() {
    this.append(this.getButtonsFlex())
    this.append(this.getResponses())
  }

  getTitle() {
    this.children.title.setText('Facebook JavaScript SDK')
    return this.children.title
  }

  getButtonsFlex() {
    const html = new HTML()
    html.append(this.getLoginButton())
    html.append(this.getLogoutButton())
    html.append(this.getLoginStatusButton())
    html.append(this.getPublishStatusMessageButton())
    return html
  }

  getLoginStatusButton() {
    const button = new nButton()
    button.setText('Get Login Status')
    button.on('click', () => FB.getLoginStatus((resp) => this.appendResponse('Get Login Status', resp)))
    return button
  }

  getLoginButton() {
    const button = new nButton()
    button.setText('Login')
    button.on('click', () => FB.login((resp) => this.appendResponse('Login', resp), { scope: 'email,user_likes,publish_actions,publish_to_groups,pages_manage_posts'}))
    return button
  }

  getLogoutButton() {
    const button = new nButton()
    button.setText('Logout')
    button.on('click', () => FB.logout((resp) => this.appendResponse('Logout', resp)))
    return button
  }

  getPublishStatusMessageButton() {
    const button = new nButton()
    button.setText('Publish a status message')
    button.on('click', () => FB.api('/me/feed', 'post', { message: 'Now is ' + (new Date()).toString() }, (resp) => this.appendResponse('Publish a status message', resp)))
    return button
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
