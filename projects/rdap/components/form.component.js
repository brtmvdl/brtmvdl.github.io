import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class FormComponent extends HTML {
  children = {
    tld: new InputComponent({ label: 'tld', value: 'google.com.br' })
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTldInputComponent())
    this.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
  }

  getTldInputComponent() {
    return this.children.tld
  }

  onSendButtonClick() {
    this.dispatch('submit', { tld: this.children.tld.getValue() })
  }
}
