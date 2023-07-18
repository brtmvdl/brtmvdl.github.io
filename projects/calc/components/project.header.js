import { nElement, nFlex } from '../../../js/nElement/index.js'

export class ProjectHeaderComponent extends nElement {
  project = null

  children = {
    domain: new nElement(),
    contract: new nElement(),
  }

  getName() {
    return 'project-header-component'
  }

  onCreate() {
    const flex = new nFlex()
    flex.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 16) #000000')
    flex.setStyle('padding', '0.5rem')

    flex.append(this.getDomain())
    flex.append(this.getContract())

    return this.append(flex)
  }

  setProject(project = {}) {
    this.project = project
    return this
  }

  getDomain() {
    return this.children.domain.setText(this.project.domain)
  }

  getContract() {
    const contract = this.project.contract
    return this.children.contract.setText(`${+contract}y`)
  }
}
