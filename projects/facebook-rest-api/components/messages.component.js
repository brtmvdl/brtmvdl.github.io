import * as Components from '../../../assets/js/components/messages.component.js'
import { MessageCardComponent } from '../../../assets/js/components/message.card.component.js'
import { MessageModel } from '../../../assets/js/models/message.model.js'

export class MessagesComponent extends Components.MessagesComponent {
  getMessageCardComponent(message = new MessageModel()) {
    return new MessageCardComponent(message)
  }
}
