import { OutputMessageCardComponent } from '../../../assets/js/components/output.message.card.component.js'
import { CardBodyComponent } from '../../../assets/js/components/card.body.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class TickerPriceOutputMessageCardComponent extends OutputMessageCardComponent {
  getBodyComponent() {
    const { symbol, price } = this.message.output
    const body = new CardBodyComponent()
    body.append(new TextComponent(`Symbol: ${symbol}`))
    body.append(new TextComponent(`Price: ${+price}`))
    return body
  }
}
