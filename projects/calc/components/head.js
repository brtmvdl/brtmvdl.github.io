import { nElement } from '../../../js/nElement/index.js'
import { nFlex, nInputTextGroup, nSelectGroup } from '../../../js/nElement/components/index.js'
import { HourInputGroup } from './hour-input-group.js'

export class HeadElement extends nElement {
  domain = new nInputTextGroup()
  hour = new HourInputGroup()
  contract = new nSelectGroup()

  constructor() {
    super({
      component: { name: 'head-el' }
    })

    const flex = new nFlex()
    flex.setContainerStyle('margin', '0 auto')
    flex.setContainerStyle('width', '40rem')

    this.domain.label.setText('domain')
    this.domain.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    flex.append(this.domain)

    flex.append(this.hour)

    this.contract.label.setText('contract')
    this.contract.input.addOption('01', '1 year')
    flex.append(this.contract)

    this.append(flex)
  }
} 
