import { nButton, nElement, nInputTextGroup, nSelectGroup } from '../../js/nelement/index.js'
import * as COLORS from '../../js/nelement/utils/colors.js'

class HeadElement extends nElement {
  onCreate() {
    this.setStyles()
    this.setText('Calc')
  }

  setStyles() {
    this.setStyle('background-color', COLORS.BLACK_1)
    this.setStyle('color', COLORS.WHITE_1)
    this.setStyle('text-align', 'center')
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('font-size', '3rem')
    this.setStyle('padding', '1rem')
  }
}

class FormElement extends nElement {
  children = {
    domain: new nInputTextGroup(),
    contract: new nSelectGroup(),
    button: new nButton(),
  }

  onCreate() {
    this.append(this.getDomainInputGroup())
    this.append(this.getContractSelectGroup())
    this.append(this.getButton())
  }

  getDomainInputGroup() {
    this.children.domain.children.input.setPlaceholder('domain.com')

    return this.children.domain
  }

  getContractSelectGroup() {
    return this.children.contract
  }

  getButton() {
    this.children.button.on('click', () => this.dispatchEvent('createproject', {
      domain: this.children.domain.children.input.getValue(),
      contract: this.children.contract.children.select.getValue(),
    }))

    return this.children.button
  }
}

class ProjectsListElement extends nElement {
  onCreate() {
  }

  createProject(project) {
    console.log({ project })
  }
}

class BodyElement extends nElement {
  children = {
    form: new FormElement(),
    list: new ProjectsListElement(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getFormElement())
    this.append(this.getProjectsListElement())
  }

  getFormElement() {
    this.children.form.on('createproject', ({ value }) => this.children.list.createProject(value))

    return this.children.form
  }

  getProjectsListElement() {
    return this.children.list
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }
}

export class Page extends nElement {
  children = {
    head: new HeadElement(),
    body: new BodyElement(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getHead())
    this.append(this.getBody())
  }

  setStyles() {
    this.setStyle('', '')
  }

  getHead() {
    return this.children.head
  }

  getBody() {
    return this.children.body
  }

}
