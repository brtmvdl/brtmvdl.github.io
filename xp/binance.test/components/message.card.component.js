import { HTML, nFlex } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js'
import { CardComponent } from './card.component.js'
import { TextComponent } from './text.component.js'
import { CardHeaderComponent } from './card.header.component.js'
import { CardBodyComponent } from './card.body.component.js'
import { CardFooterComponent } from './card.footer.component.js'
import * as str from '../../../assets/js/utils/str.js'

export class MessageCardComponent extends CardComponent {
  message = null

  constructor(message = new MessageModel()) {
    super()
    this.message = message
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
    this.append(this.getFooterComponent())
  }

  getHeaderComponent() {
    const card = new CardHeaderComponent()
    const flex = new nFlex()
    flex.append(new TextComponent(this.message.method))
    flex.append(new TextComponent(this.message.side))
    card.append(flex)
    return card
  }

  getBodyComponent() {
    return new CardBodyComponent()
  }

  getFooterComponent() {
    const card = new CardFooterComponent()
    card.append(new TextComponent(this.message.id, str.datetime2str(this.message.id)))
    return card
  }
}
