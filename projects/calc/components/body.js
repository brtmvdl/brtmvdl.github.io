import { nElement } from '../../../js/nElement/index.js'
import { FormComponent } from './form.js'
import { ProjectsComponent } from './projects.js'

export class BodyComponent extends nElement {
  children = {
    form: new FormComponent(),
    projects: new ProjectsComponent(),
  }

  getName() {
    return 'body'
  }

  onCreate() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')

    this.append(this.getForm())
    this.append(this.getProjects())
  }

  getForm() {
    this.children.form.setStyle('margin-bottom', '1rem')
    return this.children.form.on('createproject', ({ value }) => {
      this.children.projects.createProject(value)
      this.children.form.clear()
    })
  }

  getProjects() {
    return this.children.projects
  }
}
