import { HTML, COLORS, nFlex, nInput, nSelect } from '../../../assets/js/libs/frontend/index.js'

import { CONTRACTS } from '../utils/constansts.js'

import { ButtonComponent } from '../../../assets/js/components/button.component.js'

export class ProjectHeader extends nFlex {
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
    this.children.domain.setText(this.state.domain)
    this.children.domain.setPlaceholder('domain.com')
    this.children.domain.setStyle('border', 'none')

    this.children.domain.addEventListener('input', () => this.state.domain = this.children.domain.getValue())

    return this.children.domain
  }

  getContract() {
    this.children.contract.setValue(10)

    CONTRACTS.map(([key, value]) => this.children.contract.addOption(key, value))

    this.children.contract.setStyle('border', 'none')
    this.children.contract.setStyle('background-color', COLORS.WHITE_1)

    this.children.contract.addEventListener('input', () => this.state.contract = this.children.contract.getValue())

    return this.children.contract
  }

  getDelButton() {
    return new ButtonComponent({ text: 'delete', onclick: () => this.dispatch('deleteproject', this) })
  }

  getPlusButton() {
    return new ButtonComponent({ text: 'plus', onclick: () => this.dispatch('createendpoint', this) })
  }
}
