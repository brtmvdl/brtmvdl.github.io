import { MessageCardComponent } from '../../../assets/js/components/message.card.component.js'
import { CardBodyComponent } from '../../../assets/js/components/card.body.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class FoxbitMessageCardComponent extends MessageCardComponent {
  getBodyComponent() {
    const card = new CardBodyComponent()
    card.append(new TextComponent({ text: JSON.stringify(this.message.asJSON()) }))
    return card
  }
}
