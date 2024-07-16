import { HTML, nButton } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends PaddingComponent {
  children = {
    title: new HTML(),
    responses: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'facebook javascript sdk' }))
    this.append(this.getButtonsFlex())
    this.append(this.getResponses())
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
    const scope = 'email,user_likes,publish_actions,publish_to_grwoups,pages_manage_metadata,pages_manage_posts,pages_manage_read_engagement,pages_show_list'
    FB.login((data) => this.onFacebookLogin(data), { config_id, scope })
  }

  onFacebookLogin(data) {
    this.appendResponse('Login', data)
    Local.set(['facebook.accessToken'], data.authResponse.accessToken)
  }

  onFacebookGetLoginStatusButtonClick() {
    FB.getLoginStatus((data) => this.appendResponse('Get Login Status', data), {})
  }

  onFacebookPublishStatusMessageButtonClick() {
    const message = `Date time: ${Date.now()}`
    FB.api('/me/feed', 'post', { message }, (data) => this.appendResponse('Publish a Status Message', data))
  }

  onFacebookLogoutButtonClick() {
    const access_token = Local.get(['facebook.accessToken'])
    FB.logout((data) => this.appendResponse('Logout', data), { access_token })
  }

  appendResponse(name, resp = {}) {
    const text = JSON.stringify({ name, resp }, null, 4)
    const text_component = new TextComponent({ text })
    this.children.responses.append(text_component)
  }

  getResponses() {
    return this.children.responses
  }
}
