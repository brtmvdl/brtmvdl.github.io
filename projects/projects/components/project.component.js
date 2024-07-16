import { HTML } from '../../../assets/js/libs/frontend/index.js'

import { EndPointModel } from '../models/endpoint.js'
import { ProjectModel } from '../models/project.js'

import { EndPoint } from './endpoint.js'
import { ProjectHeader } from './project.header.js'
import { ProjectFooter } from './project.footer.js'

export class ProjectComponent extends HTML {
  state = new ProjectModel()

  children = {
    header: new ProjectHeader(),
    endpoints: new HTML(),
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

    this.children.header.dispatch('createendpoint')
  }

  setStyles() {
    this.setStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
    this.setStyle('margin-bottom', '1rem')
  }

  getHeader() {
    return this.children.header
  }

  setEvents() {
    this.children.header.addEventListener('createendpoint', () => this.onCreateEndPoint())

    this.addEventListener('updateendpoints', () => this.onUpdateEndPoints())

    this.addEventListener('updatevalues', () => this.onUpdateValues())
    this.addEventListener('updatefooter', () => this.onUpdateFooter())
  }

  onCreateEndPoint() {

    this.state.endpoints.push(new EndPointModel())
    this.dispatch('updateendpoints')
  }

  onUpdateEndPoints() {

    this.children.endpoints.clear()

    this.state.endpoints.map((ep) => {
      const endpoint = new EndPoint(ep)
      endpoint.addEventListener('updateendpoint', () => this.dispatch('updateendpoints'))
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
