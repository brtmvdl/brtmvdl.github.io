import { HTML, nFlex, nInputNumber, nInputText } from '../../../assets/js/libs/frontend/index.js'

import { EndPointModel } from '../models/endpoint.js'

export class EndPoint extends HTML {
  state = {
    path: '/',
    hours: 0,
  }

  children = {
    path: new nInputText(),
    hours: new nInputNumber(),
    delButton: new HTML(),
  }

  constructor(state = new EndPointModel()) {
    super()

    this.state = state
  }

  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getPath())
    flex.append(this.getHours())
    return flex
  }

  getPath() {
    this.children.path.setValue(this.state.path)

    this.children.path.setPlaceholder('/home')
    this.children.path.setStyle('width', '80%')
    this.children.path.setStyle('border', 'none')
    this.children.path.setStyle('padding', 'calc(1rem / 4)')
    this.children.path.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.children.path.setContainerStyle('width', '100%')

    this.children.path.addEventListener('input', () => {
      this.state.path = this.children.path.getValue()
      this.dispatch('updateendpoint')
    })

    return this.children.path
  }

  getHours() {
    this.children.hours.setValue(this.state.hours)

    this.children.hours.setValue(8)
    this.children.hours.setAttr('min', 1)

    this.children.hours.setStyle('width', '80%')
    this.children.hours.setStyle('border', 'none')
    this.children.hours.setStyle('text-align', 'right')
    this.children.hours.setStyle('padding', 'calc(1rem / 4)')
    this.children.hours.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.children.hours.addEventListener('input', () => {
      this.state.hours = +this.children.hours.getValue()
      this.dispatch('updateendpoint')
    })

    return this.children.hours
  }
}
