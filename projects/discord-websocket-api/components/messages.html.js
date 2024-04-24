import { HTML } from '@brtmvdl/frontend'
import { MessageModel } from '../models/messages.model.js'
import * as messages from './messages/index.js'

export class MessagesHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  onMessage({ value = new MessageModel() } = {}) {
    console.log('onMessage', { value })

    this.prepend(this.getMessageHTML(value))
  }

  getMessageHTML(message = new MessageModel()) {
    if (message.side == 'socket') return this.getSocketSideMessage(message)

    switch (message.opcode) {
      case 0: return this.getMessageByName(message)
      case 1: return new messages.HeartbeatInputMessage(message)
      case 2: return new messages.IdentifyMessage(message)
      case 10: return new messages.HeartbeatOutputMessage(message)
      case 11: return new messages.HeartbeatACKMessage(message)
    }

    return new messages.MessageCardHTML()
  }

  getSocketSideMessage(message = new MessageModel()) {
    switch (message.name) {
      case 'open': return new messages.openMessage(message)
      case 'close': return new messages.closeMessage(message)
      case 'error': return new messages.errorMessage(message)
    }

    return new messages.MessageCardHTML()
  }

  getMessageByName(message = new MessageModel()) {
    switch (message.name) {
      case 'GUILD_CREATE': return new messages.GuildCreateMessage(message)
      case 'READY': return new messages.ReadyMessage(message)
      case 'VOICE_STATE_UPDATE': return new messages.VoiceStateUpdateMessage(message)
      case 'TYPING_START': return new messages.TypingStartMessage(message)
      case 'MESSAGE_CREATE': return new messages.MessageCreateMessage(message)
    }

    return new messages.MessageCardHTML()
  }
}
