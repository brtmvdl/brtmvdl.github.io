import { HTML, nFlex } from '../../../assets/js/libs/frontend/index.js'

export class Head extends HTML {
  children = {
    title: new HTML(),
    addProject: new HTML(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('margin', '0 auto')
    this.setStyle('padding', '1rem')
    this.setStyle('width', '40rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getTitle())
    flex.append(this.getAddProject())
    return flex
  }

  getTitle() {
    this.children.title.setText('projects')
    return this.children.title
  }

  getAddProject() {
    this.children.addProject.setText('create project')
    this.children.addProject.setStyle('cursor', 'pointer')
    this.children.addProject.addEventListener('click', () => this.dispatch('createproject'))
    return this.children.addProject
  }
}
