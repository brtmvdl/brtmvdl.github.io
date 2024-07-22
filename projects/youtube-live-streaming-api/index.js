import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'

export class Page extends PaddingComponent {
  children = {
    client_id: new InputComponent({ label: 'client id' }),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'youtube live streaming api' }))
    this.append(this.getClientIdInputComponent())
    this.append(new ButtonComponent({ text: 'authenticate', onclick: () => this.onAuthenticateButtonClick() }))
  }

  getClientIdInputComponent() {
    return this.children.client_id
  }

  getClientId() {
    return this.children.client_id.getValue()
  }

  onAuthenticateButtonClick() {
    gapi.load('client:auth2', () => { gapi.auth2.init({ client_id: this.getClientId() }) })
  }
}
