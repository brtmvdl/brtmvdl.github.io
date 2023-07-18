import { nElement } from '../../../js/nElement/index.js'
import { ProjectComponent } from './project.js'

export class ProjectsComponent extends nElement {
  projects = []

  getName() {
    return 'projects-component'
  }

  createProject(proj) {
    this.projects.push(proj)
    return this.append(new ProjectComponent(proj))
  }
}
