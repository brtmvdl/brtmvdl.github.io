import { HTML } from '../../assets/js/libs/frontend/index.js'
import { HeaderComponent } from './components/header.component.js'
import { ContentComponent } from './components/content.component.js'
import { FooterComponent } from './components/footer.component.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getContentComponent())
    this.append(this.getFooterComponent())
  }

  getHeaderComponent() {
    return new HeaderComponent()
  }

  getContentComponent() {
    return new ContentComponent()
  }

  getFooterComponent() {
    return new FooterComponent()
  }
}
