import { nComponent, nElement } from '../nElement.js'
import { FormComponent } from './form.js'
import { ProjectsComponent } from './projects.js'

export class BodyComponent extends nComponent {
  children = {
    form: new FormComponent(),
    projects: new ProjectsComponent(),
  }

  getName() {
    return 'body-component'
  }

  onCreate() {
    super.onCreate()

    this.setStyle('margin', '0em auto')
    this.setStyle('width', '40em')

    this.append(this.getForm())
    this.append(this.getProjects())
  }

  onCreateProject(value) {
    return this.children.projects.createProject(value)
  }

  getForm() {
    return this.children.form.on('createproject', ({ value }) => this.onCreateProject(value))
  }

  getProjects() {
    return this.children.projects
  }
}
