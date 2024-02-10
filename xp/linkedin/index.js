import { HTML, nH2, nLink, nButton } from '@brtmvdl/frontend'
import * as config from './config.js'
// https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1

class TextHTML extends HTML {
  text = null

  constructor(text = null) {
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
    texts: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getAuthorizationLink())
    this.append(this.getCodeButton())
    this.append(this.getTextsHTML())
  }

  getTitle() {
    const title = new nH2()
    return title.setText('Share on LinkedIn API')
  }

  getAuthorizationLink() {
    const nlink = new nLink()
    const response_type = 'code'
    const client_id = config.apiKey
    const redirect_uri = 'https://brtmvdl.github.io/xp/linkedin/'
    const state = ''
    const scope = 'w_member_social' // encodeURIComponent(['liteprofile', 'emailaddress'].join(' '))
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
    this.append(new TextHTML(url.hash))
  }

  getTextsHTML() {
    return this.children.texts
  }
}
