import { OutputMessageCardComponent } from './output.message.card.component.js'
import { CardBodyComponent } from './card.body.component.js'
import { TextComponent } from './text.component.js'

export class TickerPriceOutputMessageCardComponent extends OutputMessageCardComponent {
  getBodyComponent() {
    const { symbol, price } = this.message.output
    const body = new CardBodyComponent()
    body.append(new TextComponent(`Symbol: ${symbol}`))
    body.append(new TextComponent(`Price: ${+price}`))
    return body
  }
}
