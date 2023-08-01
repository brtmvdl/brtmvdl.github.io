import { nLabel, nSelect, nError } from '../index.js'
import { nGroup } from './group.js'

export class nSelectGroup extends nGroup {
  children = {
    label: new nLabel(),
    select: new nSelect(),
    error: new nError(),
  }

  getName() {
    return 'select-group'
  }

  onCreate() {
    this.append(this.getLabel())
    this.append(this.getSelect())
    this.append(this.getError())
  }

  getLabel() {
    return this.children.label
  }

  getSelect() {
    return this.children.select
  }

  getError() {
    return this.children.error
  }
}
