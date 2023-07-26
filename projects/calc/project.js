import { nElement, nFlex } from '../../js/nelement/index.js'
import { ProjectBody } from './project.body.js'

export class Project extends nElement {
  state = {
    domain: '',
    contract: ''
  }

  children = {
    domain: new nElement(),
    contract: new nElement(),
    body: new ProjectBody(),
  }

  constructor({ domain, contract } = {}) {
    super()

    this.state.domain = domain
    this.state.contract = contract
  }

  onCreate() {
    this.setStyles()
    this.append(this.getHead())
    this.append(this.getBody())
  }

  setStyles() {
    this.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
  }

  getHead() {
    const head = new nFlex()
    head.setContainerStyle('border', 'calc(1rem / 8) solid #000000')
    head.setStyle('padding', '1rem')

    head.append(this.getDomain())
    head.append(this.getContract())

    return head
  }

  getDomain() {
    const domain = new nElement()
    domain.setText(this.state.domain)
    return domain
  }

  getContractText() {
    return '1y' // FIXME
  }

  getContract() {
    const contract = new nElement()
    contract.setText(this.getContractText())
    return contract
  }

  getBody() {
    return this.children.body
  }
}
