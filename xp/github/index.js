import { HTML, nLink } from '@brtmvdl/frontend'
import { client_id } from './config.js'
import * as Local from '../../assets/js/utils/local.js'
import * as Flow from '../../assets/js/utils/flow.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
    this.append(this.getLoginLink())
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

  setOauthCode() {
    const url = new URL(window.location)
    const github_code = url.searchParams.get('code')
    if (github_code) {
      Local.set(['github_code'], github_code)
      Flow.goTo('index.html')
    }
  }
}
