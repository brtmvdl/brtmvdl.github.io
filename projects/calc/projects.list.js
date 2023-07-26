import { nElement } from '../../js/nelement/index.js'
import { Project } from './project.js'

export class ProjectsList extends nElement {
  state = {
    projects: [],
  }

  children = {
    projects: new nElement(),
  }

  onCreate() {
    this.append(this.getProjects())
  }

  getProjects() {
    return this.children.projects
  }

  createProject({ domain, contract } = {}) {
    this.children.projects.append(new Project({ domain, contract }))
    return this
  }
}
