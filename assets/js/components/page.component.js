import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './header.component.js'
import { FooterComponent } from './footer.component.js'

export class PageComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(new HeaderComponent())
    this.append(this.getBodyComponent())
    this.append(new FooterComponent())
  }

  setStyles() {
    return new HTML()
  }

  getBodyComponent() {
    return new HTML()
  }
}
