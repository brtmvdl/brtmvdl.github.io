import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../models/message.model.js';
import { CardComponent } from './card.component.js'
import { TextComponent } from './text.component.js'

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
    return new HTML()
  }

  getBodyComponent() {
    const body = new HTML()
    body.append(new TextComponent(this.message.method))
    return body
  }

  getFooterComponent() {
    return new HTML()
  }
}
