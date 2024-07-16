import { HTML } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { Head } from './components/head.js'
import { Body } from './components/body.js'

export class Page extends PaddingComponent {
  children = {
    header: new Head(),
    body: new Body(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    this.children.header.addEventListener('createproject', () => this.children.body.dispatch('createproject'))

    return this.children.header
  }

  getBody() {
    return this.children.body
  }
}
