import { HTML, nButton } from '@brtmvdl/frontend'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'

import { FACEBOOK } from './facebook.js' // https://www.facebook.com/v20.0/dialog/oauth?client_id={app-id}&redirect_uri={redirect-uri}&state={state-param}

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
    this.append(new ButtonComponent({ text: 'Login', onclick: () => this.onFacebookLoginButtonClick() }))
    this.append(new ButtonComponent({ text: 'Get Login Status', onclick: () => this.onFacebookGetLoginStatusButtonClick() }))
    this.append(new ButtonComponent({ text: 'Publish a Status Message', onclick: () => this.onFacebookPublishStatusMessageButtonClick() }))
    this.append(new ButtonComponent({ text: 'Logout', onclick: () => this.onFacebookLogoutButtonClick() }))
    return html
  }

  onFacebookLoginButtonClick() {
    const config_id = 1
    FB.login((data) => console.log(data), { config_id })
  }

  onFacebookGetLoginStatusButtonClick() {
    FB.getLoginStatus((data) => console.log(data), {})
  }

  onFacebookPublishStatusMessageButtonClick() {
    const message = `Date time: ${Date.now()}`
    FB.api('/me/feed', 'post', { message }, (data) => console.log(data))
  }

  onFacebookLogoutButtonClick() {
    FB.logout((data) => console.log(data), {})
  }

  appendResponse(name, resp = {}) {
    const str = JSON.stringify({ name, resp }, null, 4)
    const html = new TextComponent(str)
    this.children.responses.append(html)
  }

  getResponses() {
    return this.children.responses
  }
}
