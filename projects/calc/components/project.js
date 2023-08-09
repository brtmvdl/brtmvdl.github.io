import { nElement, nFlex, nImage, nInput, nSelect } from '../../../js/nelement/index.js'
import * as COLORS from '../../../js/nelement/utils/colors.js'

import { EndPointModel } from '../models/endpoint.js'
import { ProjectModel } from '../models/project.js'

import { CONTRACTS } from '../utils/constansts.js'
import { Logger } from '../utils/logger.js'

import { EndPoint } from './endpoint.js'
import { ProjectHeader } from './project.header.js'
import { ProjectFooter } from './project.footer.js'

export class Project extends nElement {
  logger = new Logger('Project')

  state = new ProjectModel()

  children = {
    header: new ProjectHeader(),
    endpoints: new nElement(),
    footer: new ProjectFooter(),
  }

  constructor(state = new ProjectModel()) {
    super()

    this.state = state
  }

  onCreate() {
    this.setStyles()
    this.setEvents()
    this.append(this.getHeader())
    this.append(this.getEndPoints())
    this.append(this.children.footer)

    this.children.header.dispatchEvent('createendpoint')
  }

  setStyles() {
    this.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
    this.setStyle('margin-bottom', '1rem')
  }

  getHeader() {
    return this.children.header
  }

  setEvents() {
    this.children.header.on('createendpoint', () => this.onCreateEndPoint())

    this.on('updateendpoints', () => this.onUpdateEndPoints())

    this.on('updatevalues', () => this.onUpdateValues())
    this.on('updatefooter', () => this.onUpdateFooter())
  }

  onCreateEndPoint() {
    this.logger.log('onCreateEndPoint', {})

    this.state.endpoints.push(new EndPointModel())
    this.dispatchEvent('updateendpoints')
  }

  onUpdateEndPoints() {
    this.logger.log('onUpdateEndPoints', {})

    this.children.endpoints.clear()

    this.state.endpoints.map((ep) => {
      const endpoint = new EndPoint(ep)
      endpoint.on('updateendpoint', () => this.dispatchEvent('updateendpoints'))
      this.children.endpoints.append(endpoint)
    })

    // update values
    this.state.unique = +this.state.endpoints.reduce((h, { hours }) => h + hours, 0)

    // update footer
    this.children.footer.setUnique(this.state.unique)
    this.children.footer.setYearly(this.state.yearly)
  }

  getEndPoints() {
    return this.children.endpoints
  }
}
