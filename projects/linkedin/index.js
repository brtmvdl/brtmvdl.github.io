import { HTML, nH2, nLink, nButton } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import * as config from './config.js'

// https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1

export class Page extends PaddingComponent {
  children = {
    texts: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'linkedin rest api' }))
    this.append(this.getAuthorizationLink())
    this.append(this.getCodeButton())
    this.append(this.getTextsHTML())
  }

  getAuthorizationLink() {
    const nlink = new nLink()
    const response_type = 'code'
    const client_id = config.apiKey
    const redirect_uri = 'https://brtmvdl.github.io/projects/linkedin/'
    const state = ''
    const scope = encodeURIComponent(['openid', 'profile', 'w_member_social', 'email'].join(' '))
    const link = `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`
    nlink.href(link)
    nlink.setText('authorization')
    return nlink
  }

  getCodeButton() {
    const button = new nButton()
    button.setText('get code from url')
    button.addEventListener('click', () => this.onCodeButtonClick())
    return button
  }

  onCodeButtonClick() {
    const url = new URL(window.location)
    this.append(new TextComponent({ text: url.searchParams.get('code') }))
  }

  getTextsHTML() {
    return this.children.texts
  }
}
