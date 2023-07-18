import { nElement, nFlex, nInput, nInputNumber } from '../../../js/nElement/index.js'

export class EndPointComponent extends nElement {
  children = {
    url: new nInput(),
    hours: new nInputNumber()
  }

  getName() {
    return 'end-point-component'
  }

  onCreate() {
    const flex = new nFlex()

    flex.append(this.getUrl())
    flex.append(this.getHours())

    this.append(flex)
  }

  getUrl() {
    this.children.url.setValue('/')
    return this.children.url
  }

  getHours() {
    this.children.hours.setValue(1)
    return this.children.hours
  }
}
