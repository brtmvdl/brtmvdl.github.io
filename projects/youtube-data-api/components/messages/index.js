import { CardHeaderComponent } from '../../../../assets/js/components/card.header.component.js'
import { MessageCardComponent } from '../../../../assets/js/components/message.card.component.js'
import { TextComponent } from '../../../../assets/js/components/text.component.js'

class YoutubeDataApiMessageCardComponent extends MessageCardComponent {
  name = ''

  getHeaderComponent() {
    const card = new CardHeaderComponent()
    card.append(new TextComponent({ text: this.name }))
    return card
  }
}

export class VideosListMessageCardComponent extends YoutubeDataApiMessageCardComponent {
  name = 'Videos: list'
}
