import { SocketMessageModel } from './socket.message.model.js'

export class SocketOpenMessageModel extends SocketMessageModel {
  constructor(datetime = Date.now()) {
    super('Open', { datetime })
  }
}
