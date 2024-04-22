import { CardBodyComponent } from './card.body.component.js'
import { MessageCardComponent } from './message.card.component.js'
import { TextComponent } from './text.component.js'

import * as str from '../../../assets/js/utils/str.js'

export class KlinesOutputMessageCardComponent extends MessageCardComponent {
  getBodyComponent() {
    const card = new CardBodyComponent()
    card.append(this.getTableHTML(this.parseData(this.message.output)))
    card.append(new TextComponent(`Lines: ${this.message.output.length}`))
    return card
  }

  parseData(data) {
    return Array.from(data).map(([
      KlineOpenTime,
      OpenPrice,
      HighPrice,
      LowPrice,
      ClosePrice,
      Volume,
      KlineCloseTime,
      QuoteAssetVolume,
      NumberOfTrades,
      TakerBuyBaseAssetVolume,
      TakerBuyQuoteAssetVolume,
    ]) =>
    ({
      KlineOpenTime: str.datetime2str(KlineOpenTime),
      OpenPrice: +OpenPrice,
      HighPrice: +HighPrice,
      LowPrice: +LowPrice,
      ClosePrice: +ClosePrice,
      Volume: +Volume,
      KlineCloseTime: str.datetime2str(KlineCloseTime),
      QuoteAssetVolume: +QuoteAssetVolume,
      NumberOfTrades,
      TakerBuyBaseAssetVolume: +TakerBuyBaseAssetVolume,
      TakerBuyQuoteAssetVolume: +TakerBuyQuoteAssetVolume,
    }))
  }
}
