import { Model } from '../../../assets/js/models/model.js'
import { EndPointModel } from './endpoint.js'

export class ProjectModel extends Model {
  domain = ''
  contract = ''
  endpoints = []
  unique = 0
  yearly = 0

  constructor({
    domain = '',
    contract = '',
  } = {}) {
    super()

    this.domain = domain
    this.contract = contract
  }

  addEndPoint(endpoint = new EndPointModel()) {
    this.endpoints.push(endpoint)
    return this
  }
}
