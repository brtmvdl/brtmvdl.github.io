import { SocketMessageModel } from './socket.message.model.js'

export class OpenSocketMessageModel extends SocketMessageModel {
  constructor(data = {}) {
    super('open', data)
  }
}
