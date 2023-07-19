import { nElement } from '../nElement.js'
import { ProjectModel } from '../models/projects.js'
import { ProjectComponent } from './project.js'

export class ProjectsComponent extends nElement {
  projects = []

  createProject(project) {
    this.projects.push(new ProjectModel(project))
    this.updateProjectList()
    return this
  }

  updateProjectList() {
    this.clear()
    this.projects.map((project) => this.append(new ProjectComponent(project)))
    return this
  }
}
