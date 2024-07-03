import { HTML } from '@brtmvdl/frontend'
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
    this.children.header.on('createproject', () => this.children.body.dispatchEvent('createproject'))

    return this.children.header
  }

  getBody() {
    return this.children.body
  }
}
