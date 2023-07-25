import { nComponent, nError, nInputText, nLabel } from '../index.js'

export class nInputTextGroup extends nComponent {
  children = {
    label: new nLabel(),
    input: new nInputText(),
    error: new nError(),
  }

  getName() {
    return 'input-text-group'
  }

  onCreate() {
    this.append(this.getLabel())
    this.append(this.getInput())
    this.append(this.getError())
  }

  getLabel() {
    return this.children.label
  }

  getInput() {
    return this.children.input
  }

  getError() {
    return this.children.error
  }

}
