import { HTML, nFlex, nInputNumber, nInputText } from '@brtmvdl/frontend'
import { EndPointModel } from '../models/endpoint.js'
import { Logger } from '../utils/logger.js'

export class EndPoint extends HTML {
  logger = new Logger('EndPoint')

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
    this.logger.log('getFlex', {})

    const flex = new nFlex()
    flex.append(this.getPath())
    flex.append(this.getHours())
    return flex
  }

  getPath() {
    this.logger.log('getURL', {})

    this.children.path.setValue(this.state.path)

    this.children.path.setPlaceholder('/home')
    this.children.path.setStyle('width', '80%')
    this.children.path.setStyle('border', 'none')
    this.children.path.setStyle('padding', 'calc(1rem / 2)')
    this.children.path.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.children.path.setContainerStyle('width', '100%')

    this.children.path.on('input', () => {
      this.logger.log('url:oninput', {})

      this.state.path = this.children.path.getValue()
      this.dispatchEvent('updateendpoint')
    })

    return this.children.path
  }

  getHours() {
    this.logger.log('getHours', {})

    this.children.hours.setValue(this.state.hours)

    this.children.hours.setValue(8)
    this.children.hours.setAttr('min', 1)

    this.children.hours.setStyle('width', '80%')
    this.children.hours.setStyle('border', 'none')
    this.children.hours.setStyle('text-align', 'right')
    this.children.hours.setStyle('padding', 'calc(1rem / 2)')
    this.children.hours.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.children.hours.on('input', () => {
      this.logger.log('hours:oninput', {})

      this.state.hours = +this.children.hours.getValue()
      this.dispatchEvent('updateendpoint')
    })

    return this.children.hours
  }
}
