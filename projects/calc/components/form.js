import { nComponent, nFlex, nInputTextGroup, nSelectGroup } from '../nElement.js'

export class FormComponent extends nComponent {
  children = {
    domain: new nInputTextGroup(),
    contract: new nSelectGroup(),
  }

  getName() {
    return 'form-component'
  }

  onCreate() {
    const flex = new nFlex()

    flex.append(this.getDomain())
    flex.append(this.getContract())

    return this.append(flex)
  }

  getDomain() {
    this.children.domain.children.label.setText('domain')

    return this.children.domain
  }

  getContract() {
    this.children.contract.children.label.setText('contract')

    return this.children.contract
  }
}
