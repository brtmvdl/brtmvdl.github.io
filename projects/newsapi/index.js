import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './components/header.component.js'
import { FooterComponent } from './components/footer.component.js'

export class Page extends HTML {
  children = {
    header: new HeaderComponent(),
    content: new HTML(),
    footer: new FooterComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderHTML())
    this.append(this.getContentHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    return this.children.header
  }

  getContentHTML() {
    return this.children.content
  }

  getFooterHTML() {
    return this.children.footer
  }

}
