
export class ProjectModel {
  domain = null
  contract = null
  endpoints = []

  constructor({
    domain = '',
    contract = '',
  } = {}) {
    this.domain = domain
    this.contract = contract
  }

  getDomainText() {
    return this.domain
  }

  getContractText() {
    return `${+this.contract}y`
  }

}
