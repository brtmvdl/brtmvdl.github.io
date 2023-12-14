import { HTML } from '@brtmvdl/frontend'
import { Logger } from '../utils/logger.js'
import { ProjectModel } from '../models/project.js'
import { Project } from './project.js'

export class Body extends HTML {
  logger = new Logger('Body')

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
    this.on('createproject', ({ }) => this.onCreateProject())
    this.on('updateprojects', ({ }) => this.onUpdateProjects())
  }

  onCreateProject() {
    this.logger.log('onCreateProject', {})

    this.state.projects.push(new ProjectModel())
    this.dispatchEvent('updateprojects')
  }

  onUpdateProjects() {
    this.logger.log('onUpdateProjects', {})

    this.children.projects.clear()
    this.state.projects.map((p, ix) => {
      const project = new Project(p)
      project.children.header.on('deleteproject', () => this.deleteProjectById(ix))
      this.children.projects.append(project)
    })
  }

  deleteProjectById(ix) {
    this.logger.log('deleteProjectById', {})

    this.state.projects = this.state.projects.filter((_, index) => ix != index)
    this.dispatchEvent('updateprojects')
  }

  getProjects() {
    this.logger.log('getProjects', {})

    return this.children.projects
  }
}
