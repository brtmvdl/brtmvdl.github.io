import { CardBodyComponent } from './card.body.component.js'
import { MessageCardComponent } from './message.card.component.js'
import { TextComponent } from './text.component.js'

export class ClosePriceKlinesOutputMessageCardComponent extends MessageCardComponent {
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(this.getTableHTML([this.message.output.map(([open_time, open_price, high_price, low_price, close_price]) => +close_price)]))
    return body
  }
}
