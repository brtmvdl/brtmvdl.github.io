import { nElement, nInputTextGroup, nCounterGroup, nSelectGroup, nButton, nFlex, nH1 } from '../../js/nelement/index.js'
import { Validation, Validator } from '../../libs/validations/index.js'

import * as COLORS from '../../libs/colors.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0rem')
  .setStyle('font-family', 'sans-serif')

class TopCalc extends nElement {
  constructor() {
    super({
      component: { name: 'top-calc' }
    })

    const title = new nH1()

    title.setText('calc')
    title.setStyle('background-color', COLORS.BLACK)
    title.setStyle('text-align', 'center')
    title.setStyle('color', COLORS.WHITE)
    title.setStyle('font-weight', 'bold')
    title.setStyle('padding', '1rem')

    this.append(title)
  }
}

class nContainer extends nElement {
  build() {
    this.setStyle('padding', '1rem 0rem')
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }
}

class HeadCalc extends nContainer {
  domain = new nInputTextGroup
  hours = new nCounterGroup
  contract = new nSelectGroup

  button = new nButton

  constructor() {
    super({
      component: { name: 'head-calc' }
    })

    super.build()

    const flex = new nFlex()

    this.domain.setContainerStyle('width', '20rem')

    this.domain.label.setText('domain')
    this.domain.input.setPlaceholder('domain.com')

    this.domain.input.setStyle('width', '100%')
    this.domain.input.setStyle('padding', '0.5rem')
    this.domain.input.setStyle('border-radius', 'calc(1rem / 8)')
    this.domain.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    flex.append(this.domain)

    this.hours.label.setText('$ / h')
    this.hours.input.setStyle('width', '100%')
    this.hours.setContainerStyle('width', '9rem')
    flex.append(this.hours)

    this.contract.label.setText('contract')
    this.contract.input.setStyle('width', '100%')
    this.contract.input.setStyle('padding', '0.5rem')
    this.contract.input.setStyle('background-color', COLORS.WHITE)
    this.contract.input.setStyle('border-radius', 'calc(1rem / 8)')
    this.contract.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    this.contract.input.addOption('01', '1 year')
    this.contract.input.addOption('03', '3 years')
    this.contract.input.addOption('05', '5 years')
    this.contract.input.addOption('10', '10 years')
    this.contract.setContainerStyle('width', '9rem')
    flex.append(this.contract)

    this.append(flex)

    this.button.setText('add project')
    this.button.setStyle('width', '100%')
    this.button.setStyle('padding', '0.75rem')
    this.button.setStyle('color', COLORS.WHITE)
    this.button.setStyle('font-weight', 'bold')
    this.button.setStyle('text-align', 'center')
    this.button.setStyle('background-color', COLORS.BLACK)
    this.button.setStyle('border-radius', 'calc(1rem / 8)')
    this.button.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    this.button.on('click', () => {
      const domain = this.domain.getValue()
      const gain = this.hours.getValue()
      const contract = this.contract.getValue()
      //
      Validator
        .validate({ domain, gain, contract })
        .with({
          domain: [Validation.url()],
          gain: [Validation.required()],
          contract: [Validation.required()],
        })
        .then(() => this.dispatchEvent('addproject', { domain, gain, contract }))
        .catch((errors) => {
          console.log({ errors })
          //
          this.hours.setError(errors.getError('gain'), { text: false })
          this.domain.setError(errors.getError('domain'), { text: false })
          this.contract.setError(errors.getError('contract'), { text: false })
        })
    })
    //
    this.append(this.button)
  }
}

class BodyCalc extends nContainer {
  constructor() {
    super({
      component: { name: 'body-calc' }
    })

    this.setText('body')

    super.build()
  }

  addProject({ domain, gain, contract } = {}) {
    // console.log('addProject', { domain, gain, contract })
  }
}

class Calc extends nElement {
  top = new TopCalc()

  head = new HeadCalc()
  body = new BodyCalc()

  constructor() {
    super({
      component: { name: 'calc' }
    })

    this.append(this.top)

    const container = new nElement()

    container.append(this.head)
    container.append(this.body)

    this.head.on('addproject', (ev) => this.body.addProject(ev))

    this.append(container)
  }
}

nElement.fromId('app').append(new Calc())
