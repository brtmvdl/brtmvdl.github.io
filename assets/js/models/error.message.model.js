import { MessageModel } from './message.model.js'
import { ErrorResponseModel } from './error.response.model.js'
import { RequestModel } from './request.model.js'

export class ErrorMessageModel extends MessageModel {
  request = new RequestModel()
  error = new ErrorResponseModel()

  constructor(request = new RequestModel(), error = new ErrorResponseModel()) {
    super(request.name, { request: request.toJSON(), error: error.toJSON() })
    this.request = request
    this.error = error
  }

  toJSON() {
    const { request, error } = this
    return { request, error }
  }
}
