import { nButton, nComponent, nFlex, nInputTextGroup, nSelectGroup } from '../../../js/nelement/index.js'
import * as COLORS from '../../../libs/colors.js'

import { Validator } from '../utils/validator.js'
import * as Validation from '../utils/validation.js'

export class FormComponent extends nComponent {
  children = {
    domain: new nInputTextGroup(),
    contract: new nSelectGroup(),
    button: new nButton()
  }

  onCreate() {
    const flex = new nFlex()
    flex.setStyle('margin-bottom', 'calc(1rem / 2)')

    flex.append(this.getDomain())
    flex.append(this.getContract())

    this.append(flex)

    this.append(this.getButton())
  }

  getDomain() {
    this.children.domain.children.label.setText('domain')

    this.children.domain.children.input.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
    this.children.domain.children.input.setStyle('padding', 'calc(1rem / 2)')
    this.children.domain.children.input.setStyle('display', 'inline-block')
    this.children.domain.children.input.setStyle('border', 'none')
    this.children.domain.children.input.setStyle('width', '100%')

    this.children.domain.children.input.setContainerStyle('width', '30rem')

    return this.children.domain
  }

  getContract() {
    this.children.contract.children.select.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
    this.children.contract.children.select.setStyle('padding', 'calc(1rem / 2)')
    this.children.contract.children.select.setStyle('border', 'none')
    this.children.contract.children.select.setStyle('width', '100%')

    this.children.contract.children.select.setContainerStyle('width', '8rem')

    this.children.contract.children.label.setText('contract')

    this.children.contract.children.select.addOption('01', '1y')
    this.children.contract.children.select.addOption('02', '2y')
    this.children.contract.children.select.addOption('03', '3y')
    this.children.contract.children.select.addOption('05', '5y')
    this.children.contract.children.select.addOption('10', '10y')

    return this.children.contract
  }

  isValid({
    domain = '',
    contract = '',
  } = {}) {
    const domainRegExp = new RegExp('[a-z]\.(com|net.org)(\.br)?')
    const isDomainValid = domainRegExp.test(domain)

    const isContractValid = true

    return isDomainValid && isContractValid
  }

  getButton() {
    this.children.button.on('click', () => {
      const domain = this.children.domain.children.input.getValue()
      const contract = this.children.contract.children.select.getValue()

      const validation = new Validator()
      validation.addField('domain', domain, [Validation.required()])
      validation.addField('contract', contract, [Validation.required()])

      if (validation.isAllValid()) {
        this.dispatchEvent('createproject', { domain, contract })

        this.children.domain.children.input.setValue('')

        this.children.contract.children.select.setValue('01')

      } else {
        if (!validation.isValid('domain')) {
          console.log('domain', { domain })
          // this.children.domain.children.input.setValue('')
        }

        if (!validation.isValid('contract')) {
          console.log('contract', { contract })
          // this.children.contract.children.select.setValue('01')
        }
      }
    })

    this.children.button.setStyle('background-color', COLORS.BLACK_1)
    this.children.button.setStyle('margin-bottom', 'calc(1rem / 2)')
    this.children.button.setStyle('padding', 'calc(1rem / 2)')
    this.children.button.setStyle('color', COLORS.WHITE_1)
    this.children.button.setStyle('border', 'none')
    this.children.button.setStyle('width', '100%')

    this.children.button.setText('add project')

    return this.children.button
  }

}
