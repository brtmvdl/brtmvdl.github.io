import { MessageModel } from './message.model.js'

export class AudioMessageModel extends MessageModel {
  type = 'audio'
  url = ''

  constructor(url, text = '') {
    super(text)
    this.url = url
  }

  toJSON() {
    const { url, type, text } = this
    return { url, type, text }
  }

}
