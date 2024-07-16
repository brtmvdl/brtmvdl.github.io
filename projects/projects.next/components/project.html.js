import { HTML, nInputText, nSelect, nFlex } from '../../../assets/js/libs/frontend/index.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { EndpointModel } from '../models/endpoint.model.js'
import { EndpointHTML } from './endpoint.html.js'

export class ProjectHTML extends HTML {
  state = {
    endpoints: [],
    services: [],
  }

  children = {
    domain: new nInputText(),
    contract: new nSelect(),
    endpoints: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    const flex = new nFlex()
    flex.setStyle('box-shadow', 'inset 0rem 0rem 0rem 1px #000000')
    flex.setStyle('margin-bottom', '1rem')
    flex.setStyle('padding', '1rem')
    const left = new nFlex()
    left.setContainerStyle('width', '50%')
    left.append(this.getDomainInputText())
    flex.append(left)
    const right = new nFlex()
    right.setContainerStyle('width', '50%')
    right.append(this.getContractSelect())
    right.append(this.getDeleteButton())
    right.append(this.getCreateButton())
    flex.append(right)
    return flex
  }

  getDomainInputText() {
    this.children.domain.addEventListener('input', () => console.log('value', this.getValue()))
    return this.children.domain
  }

  getContractSelect() {
    this.children.contract.addOption('1', '1y')
    this.children.contract.addOption('2', '2y')
    this.children.contract.addOption('5', '5y')
    return this.children.contract
  }

  getDeleteButton() {
    return new ButtonComponent({ text: 'delete', onclick: () => this.dispatch('delete') })
  }

  getCreateButton() {
    return new ButtonComponent({ text: 'create', onclick: () => this.addEndpoint(new EndpointModel()) })
  }

  getBody() {
    this.addEndpoint(new EndpointModel())
    this.children.endpoints.setStyle('box-shadow', 'inset 0rem 0rem 0rem 1px #000000')
    this.children.endpoints.setStyle('margin-bottom', '1rem')
    this.children.endpoints.setStyle('padding', '1rem')
    return this.children.endpoints
  }

  addEndpoint(endpoint = new EndpointModel()) {
    this.state.endpoints.push(endpoint)
    this.updateEndpoints()
  }

  updateEndpoints() {
    this.children.endpoints.clear()
    this.state.endpoints.map((endpoint) => this.children.endpoints.append(new EndpointHTML(endpoint)))
  }

  getValue() {
    return {
      domain: this.children.domain.getValue(),
      contract: this.children.contract.getValue(),
      // endpoints: Array.from(this.state.endpoints).map((endpoint) => endpoint.getValue()),
      // services: Array.from(this.state.services).map((service) => service.getValue()),
    }
  }

}
