import { OutputMessageModel } from './output.message.model.js'

export class ClosePriceKlinesOutputMessageModel extends OutputMessageModel {
  constructor(output) {
    super(Date.now(), 'klines.close.price', { output })
  }
}
