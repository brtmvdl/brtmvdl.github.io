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
    this.append(new ButtonComponent({ text: 'load auth2', onclick: () => this.onLoadAuth2() }))
    this.append(new ButtonComponent({ text: 'auth2 init', onclick: () => this.onAuth2Init() }))
    this.append(new ButtonComponent({ text: 'client set api key', onclick: () => this.onClientSetApiKey() }))
    this.append(new ButtonComponent({ text: 'client load youtube', onclick: () => this.onClientLoadYoutube() }))
    this.append(new ButtonComponent({ text: 'auth2 sign in', onclick: () => this.onAuth2SignIn() }))
  }

  onLoadAuth2() {
    gapi.load('auth2', () => console.log('load auth2'))
  }

  onAuth2Init() {
    gapi.auth2.init({ client_id: google.client_id })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  onClientSetApiKey() {
    gapi.client.setApiKey(google.api_key)
  }

  onClientLoadYoutube() {
    gapi.client.load('youtube', 'v3', () => console.log('client.load youtube.v3'))
  }

  onAuth2SignIn() {
    gapi.auth2.getAuthInstance().signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
  }
}
