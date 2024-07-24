import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { google } from '../../config.js'

export class Page extends PaddingComponent {
  children = {
    client_id: new InputComponent({ label: 'client id' }),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'youtube live streaming api' }))
    this.append(new ButtonComponent({ text: 'authorize', onclick: () => this.onAuthorizeButtonClick() }))
    this.append(new ButtonComponent({ text: 'authenticate', onclick: () => this.onAuthenticateButtonClick() }))
  }

  onAuthorizeButtonClick() {
    gapi.load('client:auth2', () => { gapi.auth2.init({ client_id: google.client_id }) })
  }

  onAuthenticateButtonClick() {
    gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    gapi.auth2.getAuthInstance().signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
  }
}
