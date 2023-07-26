import { nElement } from '../../js/nelement/index.js'
import { Form } from './form.js'
import { ProjectsList } from './projects.list.js'

export class Body extends nElement {
  children = {
    form: new Form(),
    list: new ProjectsList(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getForm())
    this.append(this.getProjectsList())
  }

  getForm() {
    this.children.form.on('createproject', ({ value }) => this.children.list.createProject(value))

    this.children.form.setStyle('padding', '1rem')

    return this.children.form
  }

  getProjectsList() {
    return this.children.list
  }

  setStyles() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }
}