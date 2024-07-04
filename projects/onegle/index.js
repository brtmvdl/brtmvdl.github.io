import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'

export class Page extends PaddingComponent {
  state = {
    peer: new Peer(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'onegle' }))
  }

  setEvents() {
    this.on('fb.load', () => this.onFacebookLoad())
  }

  onFacebookLoad() {
    this.append(new ButtonComponent({ text: 'login', onclick: () => this.onLoginButtonClick() }))
  }

  onLoginButtonClick() {
    console.log('on Login Button Click')
    FB.getLoginStatus((response) => console.log('getLoginStatus', { response }))
  }
}
