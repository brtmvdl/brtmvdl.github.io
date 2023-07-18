import { nElement } from '../../../js/nElement/index.js'
import { EndPointComponent } from './endpoint.js'

export class ProjectBodyComponent extends nElement {
  proj = null

  constructor(proj) {
    super()

    this.setProject(proj)
  }

  getName() {
    return 'project-body-component'
  }

  onCreate() {
    super.onCreate()

    this.updateEndPoints()
  }

  setProject(proj) {
    this.proj = proj
    return this
  }

  updateEndPoints() {
    this.append(new EndPointComponent())
  }
}
