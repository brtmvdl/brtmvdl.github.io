import { nElement, nFlex } from '../../../js/nelement/index.js'

export class Head extends nElement {
  children = {
    title: new nElement(),
    addProject: new nElement(),
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
    this.children.title.setText('Calc')

    this.children.title.setStyle('font-weight', 'bold')

    return this.children.title
  }

  getAddProject() {
    this.children.addProject.setText('create project')

    this.children.addProject.setStyle('cursor', 'pointer')

    this.children.addProject.on('click', () => this.dispatchEvent('createproject'))

    return this.children.addProject
  }
}
