import { FoxbitMessageCardComponent } from './foxbit.message.card.component.js'
import { CardBodyComponent } from '../../../assets/js/components/card.body.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class AuthenticateUserMessageCardComponent extends FoxbitMessageCardComponent {
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(new TextComponent({ text: 'AuthenticateUser' }))
    return body
  }
}

export class GetInstrumentsMessageCardComponent extends FoxbitMessageCardComponent {
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(this.getTableHTML(this.message.Payload))
    return body
  }
}
