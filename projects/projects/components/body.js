import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { ProjectModel } from '../models/project.js'
import { ProjectComponent } from './project.component.js'

export class Body extends HTML {
  state = {
    projects: [],
  }

  children = {
    projects: new HTML(),
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
    this.addEventListener('createproject', ({ }) => this.onCreateProject())
    this.addEventListener('updateprojects', ({ }) => this.onUpdateProjects())
  }

  onCreateProject() {
    this.state.projects.push(new ProjectModel())
    this.dispatch('updateprojects')
  }

  deleteProjectById(ix) {
    this.state.projects = this.state.projects.filter((_, index) => ix != index)
    this.dispatch('updateprojects')
  }

  onUpdateProjects() {
    this.children.projects.clear()
    this.state.projects.map((p, ix) => {
      const project = new ProjectComponent(p)
      project.children.header.addEventListener('deleteproject', () => this.deleteProjectById(ix))
      this.children.projects.append(project)
    })
  }

  getProjects() {
    return this.children.projects
  }
}
