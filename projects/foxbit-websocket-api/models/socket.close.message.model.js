import { SocketMessageModel } from './socket.message.model.js'

export class SocketCloseMessageModel extends SocketMessageModel {
  constructor(datetime = Date.now()) {
    super('Close', { datetime })
  }
}
