import { HTML, nLink } from '@brtmvdl/frontend'
import { client_id, access_token } from './config.js'
import * as Local from '../../assets/js/utils/local.js'
import * as Flow from '../../assets/js/utils/flow.js'

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
    responses: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
    this.append(this.getLoginLink())
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

  getApiUserButton() {
    const button = new nButton()
    button.setText('api.github.com/user') // await 
    button.on('click', () => this.onApiUserButton())
    return button
  }

  onApiUserButton() {
    fetch('https://api.github.com/user', { headers })
      .then(res => res.json())
      .then((json) => this.children.responses.append(new TextHTML(JSON.stringify(json))))
      .catch((err) => this.children.responses.append(new TextHTML(err.message)))
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
