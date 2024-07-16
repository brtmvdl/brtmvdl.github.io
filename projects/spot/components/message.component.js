import { HTML, nSelect, nButton } from '../../../assets/js/libs/frontend/index.js'
import { MessageModel } from '../models/message.model.js'
import { TextComponent } from '../components/text.component.js'

export class MessageComponent extends HTML {
  message = null

  constructor(message = new MessageModel()) {
    super()
    this.message = message
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent(this.message.id))
  }
}
