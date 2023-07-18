import { nElement } from '../../../js/nElement/index.js'
import { ProjectHeaderComponent } from './project.header.js'
import { ProjectBodyComponent } from './project.body.js'

export class ProjectComponent extends nElement {
  proj = null

  constructor(proj) {
    super()

    this.setProject(proj)
  }

  getName() {
    return 'project-component'
  }

  onCreate() {
    const header = new ProjectHeaderComponent()
    header.setProject(this.proj)
    this.append(header)

    this.append(new ProjectBodyComponent())
  }

  setProject(proj) {
    this.proj = proj
    return this
  }

  getDomainElement() {
    return this.children.domain
  }
}
