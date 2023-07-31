import { nElement } from '../../../js/nelement/index.js'
import { Project } from './project.js'

export class Body extends nElement {
  state = {
    projects: [],
  }

  children = {
    projects: new nElement(),
  }

  onCreate() {
    this.setStyles()
    this.setEvents()
    this.append(this.getProjects())
  }

  setStyles() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }

  setEvents() {
    this.on('create', ({ value }) => this.onCreateProject(value))
    this.on('update', ({ value }) => this.onUpdateProject(value))
    this.on('delete', ({ value }) => this.onDeleteProject(value))
  }

  onCreateProject() {
    const project = new Project()
    project.on('delete', ({ value }) => this.dispatchEvent('delete', value))
    this.state.projects.push(project)

    this.dispatchEvent('update')
  }

  onUpdateProject() {
    this.children.projects.clear()
    this.state.projects.map((p) => this.onCreateProject(p))
  }

  onDeleteProject(project = new Project()) {
    const domain = project.children.domain.getValue()
    const contract = project.children.contract.getValue()

    console.log({ project: { domain, contract }, projects: this.state.projects })

    this.state.projects.findIndex((p) => {
      const pDomain = p.children.domain.getValue()
      const pContract = p.children.contract.getValue()

      console.log(
        domain === pDomain &&
        contract === pContract
      )
    })

  }

  getProjects() {
    return this.children.projects
  }
}
