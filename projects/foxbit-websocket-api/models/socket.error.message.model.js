import { SocketMessageModel } from './socket.message.model.js'

export class SocketErrorMessageModel extends SocketMessageModel {
  constructor(err, datetime = Date.now()) {
    super('Error', { datetime, err })
  }
}
