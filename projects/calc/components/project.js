import { nElement } from '../nElement.js'
import { ProjectModel } from '../models/projects.js'

export class ProjectComponent extends nElement {
  model = null

  children = {
    head: new nElement(),
    body: new nElement(),
  }

  constructor(model = new ProjectModel({})) {
    super()
    this.model = model
  }

  onCreate() {
    this.append(this.getHead())
    this.append(this.getBody())
  }

  getHead() {
    this.children.head.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 16) #000000')
    this.children.head.setStyle('padding', 'calc(1rem / 4)')

    this.children.head.setText(`${this.model.getDomainText()} ${this.model.getContractText()}`)

    return this.children.head
  }

  getBody() {
    return this.children.body
  }

}
