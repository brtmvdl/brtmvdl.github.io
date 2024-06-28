import { MessageModel } from './message.model.js'
import { RequestModel } from './request.model.js';
import { ResponseModel } from './response.model.js';

export class SuccessMessageModel extends MessageModel {
  request = new RequestModel()
  response = new ResponseModel()

  constructor(request = new RequestModel(), response = new ResponseModel()) {
    super(request.name, { request: request.toJSON(), response: response.toJSON() })
    this.request = request
    this.response = response
  }

  toJSON() {
    const { request, response } = this
    return { request, response }
  }
}
