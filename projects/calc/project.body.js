import { nElement } from '../../js/nelement/index.js'
import { EndPoint } from './endpoint.js'

export class ProjectBody extends nElement {
  children = {
    endpoints: new nElement(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getEndPoints())
    this.addEndPoint()
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getEndPoints() {
    return this.children.endpoints
  }

  addEndPoint() {
    this.children.endpoints.append(new EndPoint())
  }

}
