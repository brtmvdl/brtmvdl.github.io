import { nElement } from '../../js/nElement/index.js'
import { BodyElement, HeadElement, TopBar } from './components/index.js'

export class Page extends nElement {
  top = new TopBar()

  head = new HeadElement()
  body = new BodyElement()

  constructor() {
    super({
      component: { name: 'page' }
    })

    this.append(this.top)
    //
    this.append(this.head)
    this.append(this.body)
    //
    this.head.on('newproject', ({ project }) => this.body.addProject(project))
  }
}