import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  Id = Date.now()
  Side = 'none'

  Endpoint = null
  Payload = null
  MessageType = null
  SequenceNumber = null

  constructor(Endpoint, Payload = {}, { MessageType = 0, SequenceNumber = 0 } = {}) {
    super()

    this.Endpoint = Endpoint
    this.setPayload(Payload)
    this.setMessageType(MessageType)
    this.setSequenceNumber(SequenceNumber)
  }

  setSide(Side) { this.Side = Side }

  setPayload(Payload = {}) { this.Payload = Payload }

  setMessageType(MessageType = 0) { this.MessageType = MessageType }

  setSequenceNumber(SequenceNumber = 0) { this.SequenceNumber = SequenceNumber }

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
