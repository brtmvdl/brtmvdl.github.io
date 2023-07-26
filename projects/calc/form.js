import { nButton, nElement, nFlex, nInputTextGroup, nSelectGroup } from '../../js/nelement/index.js'
import { Validator } from '../../js/libs/validator.js'
import { Validations } from '../../js/libs/validations.js'

export class Form extends nElement {
  children = {
    domain: new nInputTextGroup(),
    contract: new nSelectGroup(),
    button: new nButton(),
  }

  onCreate() {
    const flex = new nFlex()
    flex.append(this.getDomainInputGroup())
    flex.append(this.getContractSelectGroup())
    flex.append(this.getButton())
    this.append(flex)
  }

  getDomainInputGroup() {
    this.children.domain.setContainerStyle('width', '50%')

    this.children.domain.children.label.setText('domain')

    this.children.domain.children.input.setPlaceholder('domain.com')
    this.children.domain.children.input.setValue('domain.com')

    this.children.domain.children.input.setStyle('border', 'none')
    this.children.domain.children.input.setStyle('padding', 'calc(1rem / 2) 0rem')
    this.children.domain.children.input.setStyle('width', '100%')

    return this.children.domain
  }

  getContractSelectGroup() {
    this.children.contract.children.label.setText('contract')

    this.children.contract.children.select.addOption('01', '1y')
    this.children.contract.children.select.addOption('02', '2y')
    this.children.contract.children.select.addOption('03', '3y')
    this.children.contract.children.select.addOption('05', '5y')

    this.children.contract.children.select.setStyle('background-color', 'transparent')
    this.children.contract.children.select.setStyle('border', 'none')
    this.children.contract.children.select.setStyle('padding', 'calc(1rem / 2)')

    return this.children.contract
  }

  getButton() {
    this.children.button.setText('add project')

    this.children.button.setStyle('border', 'none')
    this.children.button.setStyle('padding', '1rem')
    this.children.button.setStyle('color', '#ffffff')
    this.children.button.setStyle('background-color', '#000000')
    this.children.button.setStyle('border-radius', 'calc(1rem / 4)')

    this.children.button.on('click', () => {
      this.children.domain.clearError()
      this.children.contract.clearError()

      const domain = this.children.domain.children.input.getValue()
      const contract = this.children.contract.children.select.getValue()

      const val = new Validator()
      val.addField('domain')
        .setValue(domain)
        .setRules([Validations.url()])
        .onError(() => this.children.domain.setError(''))
        .onValidate(() => this.children.domain.children.input.setValue(''))

      val.addField('contract')
        .setValue(contract)
        .setRules([Validations.required()])
        .onError(() => this.children.contract.setError(''))
        .onValidate(() => this.children.contract.children.select.setValue('01'))

      if (val.isValid()) {
        this.dispatchEvent('createproject', { domain, contract })
      }
    })

    return this.children.button
  }
}
