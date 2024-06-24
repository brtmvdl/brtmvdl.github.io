import { CardBodyComponent } from '../../../assets/js/components/card.body.component.js'
import { InputMessageCardComponent } from '../../../assets/js/components/input.message.card.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class TickerPriceInputMessageCardComponent extends InputMessageCardComponent { 
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(new TextComponent(`Symbol: ${this.message.input.symbol}`))
    return body
  }
}
