import { nElement, nFlex, nImage, nInput, nSelect } from '../../../js/nelement/index.js'
import * as COLORS from '../../../libs/colors.js'

export class Project extends nElement {
  state = {
    endpoints: [],
  }

  children = {
    domain: new nInput(),
    contract: new nSelect(),
    endpoints: new nElement(),
    delButton: new nElement(),
    plusButton: new nElement(),
  }

  constructor({ domain, contract } = {}) {
    super()

    this.state.domain = domain
    this.state.contract = contract
  }

  onCreate() {
    this.setStyles()
    this.append(this.getHead())
    this.append(this.getEndPoints())
  }

  setStyles() {
    this.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
    this.setStyle('margin-bottom', '1rem')
  }

  getDomain() {
    this.children.domain.setText('domain.com')
    this.children.domain.setPlaceholder('domain.com')

    this.children.domain.setStyle('border', 'none')

    return this.children.domain
  }

  getContract() {
    this.children.contract.setValue(1)

    this.children.contract.addOption(1, '1 year')
    this.children.contract.addOption(2, '2 years')
    this.children.contract.addOption(3, '3 years')
    this.children.contract.addOption(4, '4 years')
    this.children.contract.addOption(5, '5 years')
    this.children.contract.addOption(10, '10 years')

    this.children.contract.setStyle('border', 'none')
    this.children.contract.setStyle('background-color', COLORS.TRANSPARENT)

    return this.children.contract
  }

  getDelButtonImage() {
    const image = new nImage()
    image.src('/img/trash-can.svg')
    image.setSize('1rem')
    return image
  }

  getDelButton() {
    this.children.delButton.setStyle('margin-left', '1rem')
    this.children.delButton.append(this.getDelButtonImage())
    this.children.delButton.on('click', () => this.dispatchEvent('delete', this))
    return this.children.delButton
  }

  getPlusButtonImage() {
    const image = new nImage()
    image.src('/img/plus.svg')
    image.setSize('1rem')
    return image
  }

  getPlusButton() {
    this.children.plusButton.setStyle('margin-left', '1rem')
    this.children.plusButton.append(this.getPlusButtonImage())
    this.children.plusButton.on('click', () => this.dispatchEvent('addproject'))
    return this.children.plusButton
  }

  getHead() {
    const head = new nFlex()
    head.setContainerStyle('border', 'calc(1rem / 8) solid #000000')
    head.setStyle('padding', '1rem')

    const left = new nElement()
    left.append(this.getDomain())
    head.append(left)

    const right = new nFlex()
    right.append(this.getContract())
    right.append(this.getDelButton())
    right.append(this.getPlusButton())
    head.append(right)

    return head
  }

  getEndPoints() {
    return this.children.endpoints
  }
}
