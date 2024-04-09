import { HTML, nButton, nInputTextGroup } from '@brtmvdl/frontend'
import { TitleComponent } from './components/title.js'

export class Page extends HTML {
  children = {
    client_id: new nInputTextGroup(),
    access_token: new nInputTextGroup(),
  }

  onCreate() {
    this.append(new TitleComponent('Twitch API', 'https://dev.twitch.tv/docs/api/get-started/'))
    this.append(this.getClientIdInputTextComponent())
    this.append(this.getAccessTokenInputTextComponent())
  }

  getClientIdInputTextComponent() {
    this.children.client_id.children.label.setText('Client ID')
    this.children.client_id.children.input.setPlaceholder('Client ID')
    return this.children.client_id
  }

  getAccessTokenInputTextComponent() {
    this.children.access_token.children.label.setText('Access token')
    this.children.access_token.children.input.setValue(this.getValueByUrlHash())
    return this.children.access_token
  }

  getValueByUrlHash() {
    const url = new URL(window.location)
    const search = new URLSearchParams(url.hash.replace('#', ''))
    return search.get('access_token')
  }
}
