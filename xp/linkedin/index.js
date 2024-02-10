import { HTML, nH2, nLink } from '@brtmvdl/frontend'

// https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getAuthorizationLink())
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
    const scope = encodeURIComponent(['liteprofile', 'emailaddress'].join(' '))
    const link = `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`
    nlink.href(link)
    nlink.setText('authorization')
    return nlink
  }
}
