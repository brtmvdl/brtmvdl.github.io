// 

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
  'Heartbeat': new WebSocketEvent(1),
  'Identify': new WebSocketEvent(2, ['token', 'properties', 'intents']),
  'Presence Update': new WebSocketEvent(3),
  'Voice State Update': new WebSocketEvent(4),
  'Resume': new WebSocketEvent(6),
  'Request Guild Members': new WebSocketEvent(8),
})
