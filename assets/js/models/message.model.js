import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  Id = Date.now()
  Side = 'none'

  MessageType = null
  SequenceNumber = null
  Endpoint = null
  Payload = null

  constructor(Endpoint, Payload = {}, MessageType = 0, SequenceNumber = 0) {
    super()

    this.Endpoint = Endpoint
    this.Payload = Payload
    this.MessageType = MessageType
    this.SequenceNumber = SequenceNumber
  }

  toJSON() {
    const { MessageType, SequenceNumber, Endpoint, Payload } = this
    return { m: MessageType, i: SequenceNumber, n: Endpoint, o: JSON.stringify(Payload) }
  }

  asJSON() {
    const { Side, MessageType, SequenceNumber, Endpoint, Payload } = this
    return { Side, MessageType, SequenceNumber, Endpoint, Payload }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

}
