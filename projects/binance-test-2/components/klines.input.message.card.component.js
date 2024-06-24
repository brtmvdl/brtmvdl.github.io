import { CardBodyComponent } from '../../../assets/js/components/card.component.js'
import { MessageCardComponent } from '../../../assets/js/components/message.card.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import * as str from '../../../assets/js/utils/str.js'

export class KlinesInputMessageCardComponent extends MessageCardComponent {
  getBodyComponent() {
    const { symbol, interval, startTime, limit } = this.message.input
    const body = new CardBodyComponent()
    body.append(new TextComponent(`Symbol: ${symbol}`))
    body.append(new TextComponent(`Interval: ${interval}`))
    body.append(new TextComponent(`Start time: ${startTime}`, str.datetime2str(startTime)))
    body.append(new TextComponent(`Limit: ${limit}`))
    return body
  }
}
