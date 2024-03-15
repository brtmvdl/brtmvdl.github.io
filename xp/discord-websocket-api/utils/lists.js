
export const getEventsList = () => Array.from([
  'Discord WebSocket API',
  ...Object.keys(getOpCodeList()),
])

class WebSocketEvent {
  opcode = null
  params = []

  constructor(opcode, params = []) {
    this.opcode = opcode
    this.params = params
  }
}

export const getOpCodeList = () => ({
  'Identify': new WebSocketEvent(2, ['token', 'properties', 'intents']),
})
