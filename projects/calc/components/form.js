import { nButton, nElement, nFlex, nInputTextGroup, nSelectGroup } from '../../../js/nElement/index.js'
import * as COLORS from '../../../libs/colors.js'

export class FormComponent extends nElement {
  children = {
    domain: new nInputTextGroup(),
    contract: new nSelectGroup(),
    button: new nButton(),
  }

  getName() {
    return 'form-component'
  }

  onCreate() {
    super.onCreate()

    const flex = new nFlex()
    flex.setStyle('margin-bottom', '1rem')

    flex.append(this.getDomainInput())
    flex.append(this.getContractSelect())

    this.append(flex)

    this.append(this.getAddProjectButton())
  }

  getDomainInput() {
    this.children.domain.setContainerStyle('width', '70%')

    this.children.domain.children.label.setText('domain')

    this.children.domain.children.input.setPlaceholder('domain.com')

    this.children.domain.children.input.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 16) #000000')
    this.children.domain.children.input.setStyle('padding', '0.5rem')
    this.children.domain.children.input.setStyle('border', 'none')
    this.children.domain.children.input.setStyle('width', '100%')

    return this.children.domain
  }

  getContractSelect() {
    this.children.contract.setContainerStyle('width', '25%')

    this.children.contract.children.label.setText('contract')

    this.children.contract.children.select.addOption('01', '1y')
    this.children.contract.children.select.addOption('02', '2y')
    this.children.contract.children.select.addOption('03', '3y')
    this.children.contract.children.select.addOption('05', '5y')
    this.children.contract.children.select.addOption('10', '10y')

    this.children.contract.children.select.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 16) #000000')
    this.children.contract.children.select.setStyle('background-color', 'transparent')
    this.children.contract.children.select.setStyle('padding', '0.5rem')
    this.children.contract.children.select.setStyle('border', 'none')
    this.children.contract.children.select.setStyle('width', '100%')

    return this.children.contract
  }

  getAddProjectButton() {
    this.children.button.setText('add project')

    this.children.button.setStyle('background-color', COLORS.BLACK_1)
    this.children.button.setStyle('color', COLORS.WHITE_1)
    this.children.button.setStyle('padding', '1rem')
    this.children.button.setStyle('border', 'none')
    this.children.button.setStyle('width', '100%')

    this.children.button.on('click', () => {
      this.dispatchEvent('createproject', {
        domain: this.children.domain.children.input.getValue(),
        contract: this.children.contract.children.select.getValue(),
      })
    })

    return this.children.button
  }

  clear() {
    this.children.domain.children.input.setValue('')
    this.children.contract.children.select.setValue('01')
    return this
  }
}

