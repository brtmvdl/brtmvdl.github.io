import { nElement } from '../../../js/nelement/index.js'
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

    this.projects.map((project, ix) => {
      const component = new ProjectComponent(project)

      component.on('deleteproject', ({ value }) => {
        delete this.projects[ix]
        this.updateProjectList()
      })

      this.append(component)
    })

    return this
  }
}
