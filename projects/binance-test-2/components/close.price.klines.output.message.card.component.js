import { CardBodyComponent } from '../../../assets/js/components/card.component.js'
import { MessageCardComponent } from '../../../assets/js/components/message.card.component.js'

export class ClosePriceKlinesOutputMessageCardComponent extends MessageCardComponent {
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(this.getTableHTML([this.message.output.map(([open_time, open_price, high_price, low_price, close_price]) => +close_price)]))
    return body
  }
}
