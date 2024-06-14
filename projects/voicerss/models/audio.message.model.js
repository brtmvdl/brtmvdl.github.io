import { MessageModel } from './message.model.js'

export class AudioMessageModel extends MessageModel {
  type = 'audio'

  url = ''

  constructor(url) {
    super()
    this.url = url
  }

  toJSON() {
    const { url, type } = this
    return { url, type }
  }
}
