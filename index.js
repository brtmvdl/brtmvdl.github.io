import { HTML } from '@brtmvdl/frontend'
import { PageComponent } from './assets/js/components/page.component.js'
import { BodyComponent } from './assets/js/components/body.component.js'

export class Page extends PageComponent {
  getBodyComponent() {
    const html = new BodyComponent()
    html.setText('body component')
    return html
  }
}
