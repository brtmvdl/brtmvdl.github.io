import { HTML, nH2, nLink, nButton } from '@brtmvdl/frontend'
import * as config from './config.js'

import { TextComponent } from '../../../../assets/js/components/text.component.js'

// https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1

export class Page extends HTML {
  children = {
    texts: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitleLink())
    this.append(this.getAuthorizationLink())
    this.append(this.getCodeButton())
    this.append(this.getTextsHTML())
  }

  getTitleLink() {
    const link = new nLink()
    const title = new nH2()
    title.setText('LinkedIn API')
    link.append(title)
    return link.href('?')
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
    button.on('click', () => this.onCodeButtonClick())
    return button
  }

  onCodeButtonClick() {
    const url = new URL(window.location)
    this.append(new TextComponent(url.searchParams.get('code')))
  }

  getTextsHTML() {
    return this.children.texts
  }
}
