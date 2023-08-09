import { nElement } from './nElement.js'

export class nComponent extends nElement {
  children = {}

  getName() {
    return 'component'
  }
}
