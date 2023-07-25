import { nElement, nFlex } from '../../../js/nelement/index.js'
import { ProjectModel } from '../models/projects.js'

class ProjectHeadComponent extends nElement {
  model = null

  children = {
    domain: new nElement(),
    contract: new nElement(),
    delButton: new nElement(),
  }

  constructor(model = new ProjectModel({})) {
    super()

    this.model = model
  }

  onCreate() {
    super.onCreate()

    this.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 16) #000000')
    this.setStyle('padding', 'calc(1rem / 4)')

    const flex = new nFlex()

    flex.append(this.getDomain())
    flex.append(this.getContract())
    flex.append(this.getDelButton())

    this.append(flex)
  }

  getDomain() {
    return this.children.domain
  }

  getContract() {
    return this.children.contract
  }

  getDelButton() {
    this.children.delButton.setStyle('background-image', 'url("/projects/calc/img/icons/trash-can.svg")')
    this.children.delButton.setStyle('background-repeat', 'no-repeat')
    this.children.delButton.setStyle('height', '1rem')
    this.children.delButton.setStyle('width', '1rem')

    this.children.delButton.on('click', () => this.dispatchEvent('deleteproject', this.model))

    return this.children.delButton
  }
}

class ProjectBodyComponent extends nElement { }

export class ProjectComponent extends nElement {
  model = null

  constructor(model = new ProjectModel({})) {
    super()

    this.model = model
  }

  onCreate() {
    this.setStyles()
    this.append(this.getHead())
    this.append(this.getBody())
  }

  setStyles() {
    this.setStyle('margin-bottom', 'calc(1rem / 4)')
  }

  getHead() {
    const head = new ProjectHeadComponent(this.model)

    head.children.domain.setText(this.model.getDomainText())

    head.children.contract.setText(this.model.getContractText())

    head.on('deleteproject', ({ value }) => this.dispatchEvent('deleteproject', value))

    return head
  }

  getBody() {
    return new ProjectBodyComponent()
  }

}
