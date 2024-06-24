import { HTML, nLink, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { client_id, access_token } from './config.js'
import * as Local from '../../assets/js/utils/local.js'
import * as Flow from '../../assets/js/utils/flow.js'
import { TextComponent } from '../../../../assets/js/components/text.component.js'

export class Page extends HTML {
  children = {
    responses: new HTML(),
    access_token: new nInputTextGroup(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
    this.append(this.getLoginLink())
    this.append(this.getTokensLink())
    this.append(this.getAccessTokenInput())
    this.append(this.getApiUserButton())
    this.append(this.getResonsesHTML())
    this.setOauthCode()
  }

  getTitleHTML() {
    const html = new HTML()
    html.setText('GitHub Oauth 2.0 Login')
    return html
  }

  getLoginLink() {
    const link = new nLink()
    link.setText('login')
    link.href(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}`)
    return link
  }

  getTokensLink() {
    const link = new nLink()
    link.setText('settings/tokens')
    link.href('https://github.com/settings/tokens?type=beta')
    return link
  }

  getAccessTokenInput() {
    this.children.access_token.children.label.setText('access token')
    this.children.access_token.children.input.setPlaceholder('access_token')
    return this.children.access_token
  }

  getApiUserButton() {
    const button = new nButton()
    button.setText('api.github.com/user')
    button.on('click', () => this.onApiUserButton())
    return button
  }

  onApiUserButton() {
    fetch('https://api.github.com/user', { headers: this.getHeaders() })
      .then(res => res.json())
      .then((json) => this.children.responses.append(new TextComponent(JSON.stringify(json, null, 4))))
      .catch((err) => this.children.responses.append(new TextComponent(err.message)))
  }

  getHeaders() {
    return {
      Authorization: `token ${this.children.access_token.children.input.getValue()}`,
    }
  }

  getResonsesHTML() {
    return this.children.responses
  }

  setOauthCode() {
    const url = new URL(window.location)
    const github_code = url.searchParams.get('code')
    if (github_code) {
      Local.set(['github_code'], github_code)
      Flow.goTo('index.html')
    }
  }
}
