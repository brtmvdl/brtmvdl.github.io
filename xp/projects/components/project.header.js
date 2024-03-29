import { HTML, COLORS, nFlex, nImage, nInput, nSelect } from '@brtmvdl/frontend'
import { Logger } from '../utils/logger.js'
import { CONTRACTS } from '../utils/constansts.js'

export class ProjectHeader extends nFlex {
  logger = new Logger('Project Header')

  state = {
    domain: '',
    contract: 1,
  }

  children = {
    domain: new nInput(),
    contract: new nSelect(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('padding', '1rem')

    this.setContainerStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
  }

  getFlex() {
    const flex = new nFlex()

    const left = new HTML()
    left.append(this.getDomain())
    flex.append(left)

    const right = new nFlex()
    right.append(this.getContract())
    right.append(this.getDelButton())
    right.append(this.getPlusButton())
    flex.append(right)

    return flex
  }

  getDomain() {
    this.logger.log('getDomain', {})

    this.children.domain.setText(this.state.domain)
    this.children.domain.setPlaceholder('domain.com')
    this.children.domain.setStyle('border', 'none')

    this.children.domain.on('input', () => this.state.domain = this.children.domain.getValue())

    return this.children.domain
  }

  getContract() {
    this.logger.log('getContract', {})

    this.children.contract.setValue(10)

    CONTRACTS.map(([key, value]) => this.children.contract.addOption(key, value))

    this.children.contract.setStyle('border', 'none')
    this.children.contract.setStyle('background-color', COLORS.WHITE_1)

    this.children.contract.on('input', () => this.state.contract = this.children.contract.getValue())

    return this.children.contract
  }

  createButton(text, onclick = (() => { })) {
    const button = new HTML()
    button.setText(text)
    button.on('click', () => onclick())
    button.setStyle('cursor', 'pointer')
    return button
  }

  getDelButton() {
    return this.createButton('delete', () => this.dispatchEvent('deleteproject', this) )
  }

  getPlusButton() {
    return this.createButton('plus', () => this.dispatchEvent('createendpoint', this))
  }
}
