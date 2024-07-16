import { HTML } from '../../assets/js/libs/frontend/index.js'
import { HeaderComponent } from './components/header.component.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
  }

  getHeaderComponent() {
    return new HeaderComponent()
  }

  getBodyComponent() {
    return new HTML()
  }
}
