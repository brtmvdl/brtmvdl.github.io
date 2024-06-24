import { CardBodyComponent } from './card.body.component.js'
import { InputMessageCardComponent } from './input.message.card.component.js'
import { TextComponent } from './text.component.js'

export class TickerPriceInputMessageCardComponent extends InputMessageCardComponent { 
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(new TextComponent(`Symbol: ${this.message.input.symbol}`))
    return body
  }
}
