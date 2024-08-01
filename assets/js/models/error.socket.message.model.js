import { SocketMessageModel } from './socket.message.model.js'

export class ErrorSocketMessageModel extends SocketMessageModel {
  constructor(error = new Error()) {
    super('error', error)
  }
}
