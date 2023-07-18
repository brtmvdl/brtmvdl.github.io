import { nElement } from '../nElement.js'

export class ProjectsComponent extends nElement {
  getName() {
    return 'projects-component'
  }

  onCreate() {
    console.log('projects')
  }
}
