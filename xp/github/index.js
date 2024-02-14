import { HTML, nLink } from '@brtmvdl/frontend'
import { client_id } from './config.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
    this.append(this.getLoginLink())
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
}
