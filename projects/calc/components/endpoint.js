import { nElement, nFlex, nInputNumber, nInputText } from '../../../js/nelement/index.js'
import { DEF_HOURS, EMPTY } from '../utils/constansts.js'

export class EndPoint extends nElement {
  state = {
    path: EMPTY,
    hours: DEF_HOURS,
  }

  children = {
    path: new nInputText(),
    hours: new nInputNumber(),
    delButton: new nElement(),
  }

  constructor({
    path = EMPTY,
    hours = DEF_HOURS,
  } = {}) {
    super()

    this.state.path = path
    this.state.hours = hours
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
    this.children.path.setPlaceholder('/home')
    this.children.path.setStyle('width', '80%')
    this.children.path.setStyle('border', 'none')
    this.children.path.setStyle('padding', 'calc(1rem / 2)')
    this.children.path.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.children.path.setContainerStyle('width', '100%')

    return this.children.path
  }

  getHours() {
    this.children.hours.setValue(8)
    this.children.hours.setAttr('min', 1)

    this.children.hours.setStyle('width', '80%')
    this.children.hours.setStyle('border', 'none')
    this.children.hours.setStyle('text-align', 'right')
    this.children.hours.setStyle('padding', 'calc(1rem / 2)')
    this.children.hours.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    return this.children.hours
  }
}
