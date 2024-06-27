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
    this.append(new ButtonComponent({ text: 'Login', onclick: () => FB.login((resp) => this.appendResponse('Login', resp), { scope: 'email,user_likes' }) }))
    this.append(new ButtonComponent({ text: 'Get Login Status', onclick: () => FB.getLoginStatus((resp) => this.appendResponse('Get Login Status', resp)) }))
    this.append(new ButtonComponent({ text: 'Publish a status message', onclick: () => FB.api('/me/feed', 'post', { message: 'Now is ' + (new Date()).toString() }, (resp) => this.appendResponse('Publish a status message', resp)) }))
    this.append(new ButtonComponent({ text: 'Logout', onclick: () => FB.logout((resp) => this.appendResponse('Logout', resp)) }))
    return html
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
