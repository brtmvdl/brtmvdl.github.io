import { OutputMessageModel } from './output.message.model.js'

export class KlinesOutputMessageModel extends OutputMessageModel {
  constructor(output, rateLimits = []) {
    super(Date.now(), 'klines', { output, rateLimits })
  }
}
