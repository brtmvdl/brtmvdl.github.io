import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  id = Date.now()
  side = null
  opcode = null
  data = {}
  name = ''
  sequence_number = 0

  constructor(side, opcode, data, name = null, sequence_number = null) {
    super()

    this.opcode = opcode
    this.side = side
    this.data = data
    this.sequence_number = sequence_number
    this.name = name
  }

  maySocket() {
    return true
  }

  toJSON() {
    const { opcode, data, sequence_number, name } = this
    return { op: opcode, d: data, s: sequence_number, t: name }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

  asJSON() {
    const { side, opcode, data, name, sequence_number } = this
    return { side, opcode, data, name, sequence_number }
  }

}
