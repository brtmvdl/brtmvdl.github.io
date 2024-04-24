import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../../models/messages.model.js'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { CardHTML } from '../card.html.js'
import { getDateNow } from '../../utils/datetime.js'

export class MessageCardHTML extends CardHTML {
  message = null

  constructor(message = new MessageModel()) {
    super()
    this.message = message
  }

  onCreate() {
    super.onCreate()
    this.setAttr('id', this.message.id)
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.setText(this.message.name)
    return header
  }

  getBodyHTML() {
    const body = new CardBodyHTML()
    body.setText(JSON.stringify(this.message))
    return body
  }

  getFooterHTML() {
    const footer = new CardFooterHTML()
    footer.setText(getDateNow())
    return footer
  }

}

export class NoBodyMessage extends MessageCardHTML {
  getBodyHTML() { return new HTML() }
}

export class SocketMessage extends NoBodyMessage { }

export class openMessage extends SocketMessage { }

export class closeMessage extends SocketMessage { }

export class errorMessage extends SocketMessage { }

export class HeartbeatInputMessage extends SocketMessage {
  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.setText('Heartbeat')
    return header
  }
}

export class HeartbeatOutputMessage extends HeartbeatInputMessage {
  getBodyHTML() {
    const body = new CardBodyHTML()
    body.setText(`Heartbeat Interval: ${this.message.data.heartbeat_interval}`)
    return body
  }
}

export class SimpleHeaderMessage extends NoBodyMessage {
  header = 'simple header'

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.setText(this.header)
    return header
  }
}

export class HeartbeatACKMessage extends SimpleHeaderMessage {
  header = 'Heartbeat ACK'
}

export class IdentifyMessage extends SimpleHeaderMessage {
  header = 'Identify'
}

export class GuildCreateMessage extends SimpleHeaderMessage {
  header = 'GUILD_CREATE'
}

export class ReadyMessage extends SimpleHeaderMessage {
  header = 'READY'
}

export class MessageCreateMessage extends SimpleHeaderMessage {
  header = 'MESSAGE_CREATE'
}

export class VoiceStateUpdateMessage extends SimpleHeaderMessage {
  header = 'VOICE_STATE_UPDATE'
}

export class TypingStartMessage extends SimpleHeaderMessage {
  header = 'TYPING_START'
}
