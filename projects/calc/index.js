import { nElement } from '../../js/nElement/index.js'
import { HeadComponent } from './components/head.js'
import { BodyComponent } from './components/body.js'

export class Page extends nElement {
  getName() {
    return 'page'
  }

  onCreate() {
    this.setStyle('font-family', 'sans-serif')

    this.append(new HeadComponent())
    this.append(new BodyComponent())
  }
}
