import { HTML, nLink, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import * as Local from '../../assets/js/utils/local.js'
import * as Flow from '../../assets/js/utils/flow.js'
import { client_id } from './config.js'

export class Page extends HTML {
  children = {
    responses: new HTML(),
    access_token: new InputComponent('access token'),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent('GitHub Oauth 2.0 Login'))
    this.append(this.getLoginLink())
    this.append(this.getTokensLink())
    this.append(this.getAccessTokenInput())
    this.append(this.getApiUserButton())
    this.append(this.getResonsesHTML())
    this.setOauthCode()
  }

  getLoginLink() {
    return new LinkComponent('login', `https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}`)
  }

  getTokensLink() {
    return new LinkComponent('settings/tokens', 'https://github.com/settings/tokens?type=beta')
  }

  getAccessTokenInput() {
    return this.children.access_token
  }

  getApiUserButton() {
    return new ButtonComponent('api.github.com/user', () => this.onApiUserButton())
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
